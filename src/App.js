import './App.css';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import {authCheckState} from "./store/actions";
import {useEffect} from "react";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'))
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'))

function App(props) {
    useEffect(() => {
        props.onCheckAuthState()
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    {/*<AnimatedSwitch*/}
                    {/*    atEnter={{*/}
                    {/*        opacity: 0,*/}
                    {/*        scale: 4.2,*/}
                    {/*    }}*/}
                    {/*    atLeave={{*/}
                    {/*        opacity: bounce(0),*/}
                    {/*        scale: bounce(0.8)*/}
                    {/*    }}*/}
                    {/*    atActive={{*/}
                    {/*        opacity: bounce(1),*/}
                    {/*        scale: bounce(1),*/}
                    {/*    }}*/}
                    {/*    className="switch-wrapper"*/}
                    {/*>*/}
                    <Switch>
                        <Route path={'/'} component={BurgerBuilder} exact/>
                        {props.userId && <Route path={'/checkout'} component={asyncCheckout}/>}
                        {props.userId && <Route path={'/orders'} component={asyncOrders}/>}
                        <Route path={'/login'} component={Auth}/>
                        {props.userId && <Route path={'/logout'} component={Logout}/>}
                        <Route path={'/'} render={() => <h1 align={'center'}>Page not found !</h1>}/>
                    </Switch>
                    {/*</AnimatedSwitch>*/}
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
