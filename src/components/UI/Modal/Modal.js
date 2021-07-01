import React, {Fragment} from 'react';
import classes from './modal.module.css'
import Backdrop from "../Backdrop/Backdrop";
import PropTypes from "prop-types";

const Modal = (props) => (
    <Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={classes.Modal}
             style={{
                 transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                 opacity: props.show ? '1' : '0',
             }}>
            {props.children}
        </div>
    </Fragment>
);

export default  React.memo(Modal,
    (prevProps,
     nextProps) => prevProps.show === nextProps.show && prevProps.children === nextProps.children);

Modal.propTypes = {
    show: PropTypes.bool,
    modalClosed: PropTypes.func.isRequired,
};

