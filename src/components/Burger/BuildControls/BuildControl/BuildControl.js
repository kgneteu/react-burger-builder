import React from 'react';
import classes from "./BuildControl.module.css"
import PropTypes from "prop-types";

const BuildControl = props => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button disabled={props.disabled} className={classes.Less} onClick={()=>props.removeIngredient(props.type)}>Less</button>
            <button className={classes.More} onClick={()=>props.addIngredient(props.type)}>More</button>
        </div>
    );
};

BuildControl.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    removeIngredient: PropTypes.func,
    addIngredient: PropTypes.func,
};

export default BuildControl;
