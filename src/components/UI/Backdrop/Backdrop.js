import React from 'react';
import classes from "./Backdrop.module.css";
import PropTypes from "prop-types";

const Backdrop = (props) => (
    props.show?<div className={classes.Backdrop} onClick={props.clicked}></div>:null
);

export default Backdrop;

Backdrop.propTypes = {
    clicked: PropTypes.func,
};

