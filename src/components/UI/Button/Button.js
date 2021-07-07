import React from 'react';
import classes from "./Button.module.css";
import PropTypes from "prop-types";

const Button = (props) => {
    const disabled = !props.disabled ? 'disabled' : null;
    return (
        <button
            className={[classes.Button, classes[props.btnType]].join(' ')}
            onClick={props.clicked}
            disabled={props.disabled}
        >{props.children}
        </button>
    )
};

export default Button;

Button.propTypes = {
    btnType: PropTypes.string,
    clicked: PropTypes.func,
    disabled: PropTypes.bool
};

