import {Fragment, React} from 'react';
import Button from "../../UI/Button/Button";
import PropTypes from "prop-types";
import {connect} from "react-redux";

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
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType={'Danger'} clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType={'Success'} clicked={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
    }
}

export default connect(mapStateToProps)(OrderSummary);

OrderSummary.propTypes={
    price: PropTypes.number.isRequired,
    purchaseCanceled: PropTypes.func.isRequired,
    purchaseContinued: PropTypes.func.isRequired,
    ingredients: PropTypes.object.isRequired,
}
