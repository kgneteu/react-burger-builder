import {Component, Fragment} from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    switchSideDrawerHandler = () => {
        this.setState((prevState) => {
                return {showSideDrawer: !prevState.showSideDrawer}
            }
        );
    }

    render() {
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.switchSideDrawerHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Fragment>)
    }
}

export default Layout;
