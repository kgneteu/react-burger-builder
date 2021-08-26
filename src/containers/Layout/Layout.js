import {useState} from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer";

const Layout = (props) => {
    let [showSideDrawer, setShowSideDrawer] = useState(false)
    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false)
    }

    const switchSideDrawerHandler = () => {
        setShowSideDrawer(!showSideDrawer)

    }

    return (
        <>
            <Toolbar drawerToggleClicked={switchSideDrawerHandler}/>
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>{props.children}</main>
        </>)

}

export default Layout;
