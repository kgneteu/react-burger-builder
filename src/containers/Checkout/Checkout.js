import React from 'react';
import CheckoutSummary from "../../components/Order/Checkout/CheckoutSummary";
import {Redirect, Route} from "react-router";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";



const Checkout = (props) => {
    // let initState = {
    //      meat: 0,
    //      sald: 0,
    //      bacon: 0,
    //      cheese: 0,
    //  }
    //
    // const [ingredients, setIngredients] = useState(initState);
    // const [price, setPrice] = useState(0);
    //

    // useEffect(() => {
    //     const query = new URLSearchParams(props.location.search);
    //     const ingredients = {}
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             setPrice(param[1])
    //         } else {
    //             ingredients[param[0]] = param[1];
    //         }
    //
    //     }
    //     setIngredients(ingredients);
    // }, []);



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
                   // render={() => (<ContactData ingredients={props.ingredients} price={props.price}/>)}
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
