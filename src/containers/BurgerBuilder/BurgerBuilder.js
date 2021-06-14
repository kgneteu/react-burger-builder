import React, {Component, Fragment} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.setState({purchasing: false})
    }

    updatePurchaseState = () => {

        const ingredientsTotal = Object.values({...this.state.ingredients})
            .reduce((total, current, index, arr) => {
                return total + current
            });
        this.setState({purchasable: ingredientsTotal > 0})
    }
    addIngredientHandler = (type) => {
        const ingredients = {...this.state.ingredients};
        ingredients[type] = ingredients[type] + 1;

        this.setState({ingredients}, () => this.updatePurchaseState())
        this.setState({totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]}
        )

    }

    removeIngredientHandler = (type) => {
        const ingredients = {...this.state.ingredients};
        if (ingredients[type] > 0) {
            ingredients[type] = ingredients[type] - 1;
            this.setState({ingredients}, () => this.updatePurchaseState())
            this.setState({totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]})
        }
    }


    render() {
        const disabledInfo = {...this.state.ingredients}
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] < 1;
        }
        //disabledInfo.map(({_, amount}) => (amount > 0))
        // console.log(disabledInfo)
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        totalPrice={this.state.totalPrice}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls price={this.state.totalPrice}
                               purchasable={this.state.purchasable}
                               disabledInfo={disabledInfo}
                               removeIngredient={this.removeIngredientHandler}
                               addIngredient={this.addIngredientHandler}
                               ordered={this.purchaseHandler}
                />
            </Fragment>
        )

    }
}

export default BurgerBuilder;
