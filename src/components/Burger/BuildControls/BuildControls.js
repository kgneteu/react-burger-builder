import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import React from "react";
import PropTypes from "prop-types";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]
const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(({label, type}) => (
                <BuildControl key={label}
                              type={type}
                              label={label}
                              disabled={props.disabledInfo[type]}
                              removeIngredient={props.removeIngredient}
                              addIngredient={props.addIngredient}/>
            ))}
            <button disabled={!props.purchasable} onClick={props.ordered} className={classes.OrderButton}>ORDER NOW</button>
        </div>
    );
};

export default BuildControls;

BuildControls.propTypes = {
    price: PropTypes.number,
    addIngredient: PropTypes.func,
    removeIngredient: PropTypes.func,
    disabledInfo: PropTypes.object,
};
