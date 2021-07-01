import React, {useEffect, useState} from 'react';
import CheckoutSummary from "../../components/Order/Checkout/CheckoutSummary";
import {Route} from "react-router";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
    let initState = {
         meat: 0,
         sald: 0,
         bacon: 0,
         cheese: 0,
     }

    const [ingredients, setIngredients] = useState(initState);
    const [price, setPrice] = useState(0);


    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        const ingredients = {}
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                setPrice(param[1])
            } else {
                ingredients[param[0]] = param[1];
            }

        }
        setIngredients(ingredients);
    }, []);


    let checkoutCancelledHandler = () => {
        props.history.goBack();
    };

    let checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    };

    return (
        <div>
            <CheckoutSummary
                ingredients={ingredients}
                checkoutContinued={checkoutContinuedHandler}
                checkoutCancelled={checkoutCancelledHandler}
            />
            <Route path={props.match.path + '/contact-data'}
                   render={() => (<ContactData ingredients={ingredients} price={price}/>)}
            />
        </div>

    )
}

export default Checkout;
