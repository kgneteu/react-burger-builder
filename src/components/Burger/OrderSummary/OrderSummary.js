import {Fragment, React} from 'react';

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
            <p>Continue to Checkout?</p>
        </Fragment>
    );
};

export default OrderSummary;
