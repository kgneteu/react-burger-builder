import './App.css';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {Route} from "react-router";
import {BrowserRouter, Switch} from "react-router-dom";
import Orders from "./containers/Orders/Orders";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path={'/'} component={BurgerBuilder} exact/>
                        <Route path={'/checkout'} component={Checkout}/>
                        <Route path={'/orders'} component={Orders}/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        </div>
    );
}

export default App;
