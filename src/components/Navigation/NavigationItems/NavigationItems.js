import React from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from "./NavigationItem/NavigationItem";
import {connect} from "react-redux";

export const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link={'/'}>Burger Builder</NavigationItem>
        {props.userId ?
        <NavigationItem link={'/orders'}>Orders</NavigationItem>: null }
        {props.userId ?
            <NavigationItem link={'/logout'}>Log Out</NavigationItem> :
            <NavigationItem link={'/login'}>Authenticate</NavigationItem>
        }

    </ul>
);

const mapPropsToState = state => {
    return {
        userId: state.auth.userId,
    }
}

export default connect(mapPropsToState)(NavigationItems);
