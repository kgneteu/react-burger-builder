import React from 'react';
import CheckoutSummary from "../../components/Order/Checkout/CheckoutSummary";
import {Redirect, Route} from "react-router";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";



const Checkout = (props) => {

    let checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    let checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    };

    let checkoutSummary=<Redirect to={'/'}/>
    let ingredients = props.ingredients;

    if (ingredients && !props.purchased){
        checkoutSummary=(<CheckoutSummary
            ingredients={ingredients}
            checkoutContinued={checkoutContinuedHandler}
            checkoutCancelled={checkoutCancelledHandler}
        />)
    }
    return (
        <div>
            {checkoutSummary}
            <Route path={props.match.path + '/contact-data'}
                component={ContactData}
            />
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased,
        building: state.auth.building,
    }
}


export default connect(mapStateToProps)(Checkout);
