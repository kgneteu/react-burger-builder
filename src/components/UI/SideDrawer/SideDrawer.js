import React, {Fragment} from 'react';
import classes from './SideDrawer.module.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import Backdrop from "../Backdrop/Backdrop";

const SideDrawer = (props) => (
    <Fragment>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={[classes.SideDrawer, props.open ? classes.Open : classes.Close].join(' ')}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems/>
            </nav>
        </div>
    </Fragment>
);

export default SideDrawer;
