import React, {Component, Fragment} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";

import * as burgerBuilderActions from "../../store/actions/";
import {purchaseInit, setAuthRedirect} from "../../store/actions/";


export class BurgerBuilder extends Component {
    state = {
        purchasing: false,

    }

    componentDidMount() {

        if (!this.props.building){
            this.props.onInitIngredients();
        }
    }


    purchaseHandler = () => {
        if (this.props.userId) {
            this.setState({purchasing: true})
        } else {
            this.props.onSetRedirectPath('/checkout')
            this.props.history.push('/login?building=true');
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
        });

    }


    updatePurchaseState = () => {
        const ingredientsTotal = Object.values({...this.props.ingredients})
            .reduce((total, current) => {
                return total + current
            });
        return (ingredientsTotal > 0)
    }

    render() {
        const disabledInfo = {...this.props.ingredients}
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1;
        }
        let order_summary = null;
        if (this.props.ingredients !== null) {
            // if (this.state.loading) {
            //     order_summary = <Spinner/>
            // } else {
            order_summary = <OrderSummary
                //  totalPrice={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                //    ingredients={this.props.ingredients}
            />
            // }
        }


        let burger;
        if (!this.props.ingredients) {
            burger = this.props.error ? <p>Cannot load ingredients</p> : <Spinner/>
        } else {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        userId={this.props.userId}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState()}
                        disabledInfo={disabledInfo}
                        removeIngredient={this.props.onIngredientRemoved}
                        addIngredient={this.props.onIngredientAdded}
                        ordered={this.purchaseHandler}
                    /></React.Fragment>
            )
        }


        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {order_summary}
                </Modal>
                {burger}
            </Fragment>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        userId: state.auth.userId,
        building: state.burgerBuilder.building,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
        onAddIngredients: (ingredients) => dispatch(burgerBuilderActions.addIngredients(ingredients)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetRedirectPath: (path) => dispatch(setAuthRedirect(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
