import './App.css';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import {authCheckState} from "./store/actions";
import react, {Suspense, useEffect} from "react";
import {connect} from "react-redux";


const AsyncCheckout = react.lazy(() => import('./containers/Checkout/Checkout'))
const AsyncOrders = react.lazy(() => import('./containers/Orders/Orders'))
const AsyncAuth = react.lazy(() => import('./containers/Auth/Auth'))

function App({onCheckAuthState, ...props}) {
    useEffect(() => {
        onCheckAuthState()
    }, [onCheckAuthState])

    let routes = (<Switch>
        <Route path={'/'} component={BurgerBuilder} exact/>
        {props.userId && <Route path={'/checkout'} render={(props) => <AsyncCheckout {...props}/>}/>}
        {props.userId && <Route path={'/orders'} render={() => <AsyncOrders/>}/>}
        <Route path={'/login'} render={props => <AsyncAuth {...props}/>}/>
        {props.userId && <Route path={'/logout'} component={Logout}/>}
        <Route path={'/'} render={() => <h1 align={'center'}>Page not found !</h1>}/>
    </Switch>)

    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    <Suspense fallback={<p>Loading...</p>}>{routes}></Suspense>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = state => {
    return {userId: state.auth.userId,}
}
const mapDispatchToProps = dispatch => {
    return {
        onCheckAuthState: () => dispatch(authCheckState()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
