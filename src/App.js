import './App.css';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import {spring} from "react-router-transition";


function App() {
    // wrap the `spring` helper to use a bouncy config
    function bounce(val) {
        return spring(val, {
            stiffness: 330,
            damping: 22,
        });
    }

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
                        <Route path={'/checkout'} component={Checkout}/>
                        <Route path={'/orders'} component={Orders}/>
                        <Route path={'/login'} component={Auth}/>
                    </Switch>
                    {/*</AnimatedSwitch>*/}
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;
