import React, {useCallback, useEffect, useState} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {useDispatch, useSelector} from "react-redux";

import * as burgerBuilderActions from "../../store/actions/";

import {useHistory} from "react-router";

//{building, ...props}

const BurgerBuilder = () => {

    const [purchasing, setPurchasing] = useState(false);
    const dispatch = useDispatch();

    const onIngredientAdded = (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName));
    const onIngredientRemoved = (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName));
    //const onAddIngredients = (ingredients) => dispatch(burgerBuilderActions.addIngredients(ingredients));
    const onInitIngredients = useCallback(() => dispatch(burgerBuilderActions.initIngredients()),[dispatch]);
    const onInitPurchase = () => dispatch(burgerBuilderActions.purchaseInit());
    const onSetRedirectPath = (path) => dispatch(burgerBuilderActions.setAuthRedirect(path));

    //const initIngredients = dispatch(initIngredients());
    const [ingredients, price, error, userId, building] = useSelector(state => {
        return [
            state.burgerBuilder.ingredients,
            state.burgerBuilder.totalPrice,
            state.burgerBuilder.error,
            state.auth.userId,
            state.burgerBuilder.building,
        ]
    })

    useEffect(() => {
        if (!building) onInitIngredients()
    }, [onInitIngredients, building]);

    const history = useHistory()

    const purchaseHandler = () => {
        if (userId) {
            setPurchasing(true)
        } else {
            onSetRedirectPath('/checkout')
            history.push('/login?building=true');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        history.push({
            pathname: '/checkout',
        });

    }

    const updatePurchaseState = () => {
        const ingredientsTotal = Object.values({...ingredients})
            .reduce((total, current, index, arr) => {
                return total + current
            });
        return (ingredientsTotal > 0)
    }

    const disabledInfo = {...ingredients}
    for (const key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] < 1;
    }
    let order_summary = null;
    if (ingredients !== null) {
        order_summary = <OrderSummary
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />
    }


    let burger = null;
    if (!ingredients) {
        burger = error ? <p>Cannot load ingredients</p> : <Spinner/>
    } else {
        burger = (
            <React.Fragment>
                <Burger ingredients={ingredients}/>
                <BuildControls
                    userId={userId}
                    price={price}
                    purchasable={updatePurchaseState()}
                    disabledInfo={disabledInfo}
                    removeIngredient={onIngredientRemoved}
                    addIngredient={onIngredientAdded}
                    ordered={purchaseHandler}
                /></React.Fragment>
        )
    }


    return (
        <>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {order_summary}
            </Modal>
            {burger}
        </>
    )

}

//
// const mapStateToProps = (state) => {
//     return {
//         ingredients: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         userId: state.auth.userId,
//         building: state.burgerBuilder.building,
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
//         onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
//         onAddIngredients: (ingredients) => dispatch(burgerBuilderActions.addIngredients(ingredients)),
//         onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
//         onInitPurchase: () => dispatch(purchaseInit()),
//         onSetRedirectPath: (path) => dispatch(setAuthRedirect(path))
//     }
// }
//default connect(mapStateToProps, mapDispatchToProps)(
export default WithErrorHandler(BurgerBuilder, axios);
