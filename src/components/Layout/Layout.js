import {Fragment} from "react";
import classes from "./Layout.module.css";

function Layout(props) {
    return (
        <Fragment>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={classes.Content}>{props.children}</main>
        </Fragment>)
}

export default Layout;
