import {Fragment, React} from 'react';
import Button from "../../UI/Button/Button";
import PropTypes from "prop-types";

const OrderSummary = props => {

    let ingredientSummary = Object.keys(props.ingredients).map(key => {
            return (
                <li key={key}>
                    <span style={{textTransform: 'capitalize'}}> {key}</span>: {props.ingredients[key]}
                </li>)
        }
    )
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType={'Danger'} clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    );
};

export default OrderSummary;

OrderSummary.propTypes={
    totalPrice: PropTypes.number.isRequired,
    purchaseCanceled: PropTypes.func.isRequired,
    purchaseContinued: PropTypes.func.isRequired,
    ingredients: PropTypes.object.isRequired,
}
