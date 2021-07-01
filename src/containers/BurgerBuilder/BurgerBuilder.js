import React, {Component, Fragment} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {

        axios.get('/ingredients.json')
            .then(response => {
                if (response?.data) this.setState({ingredients: response.data})
            }).catch(err => {
            this.setState({error: true})
        })
    }


    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients){
           queryParams.push(
               encodeURIComponent(i)+'='+ encodeURIComponent(this.state.ingredients[i])
           )
        }
        queryParams.push('price='+this.state.totalPrice)
        const queryString='?'+queryParams.join('&')
        this.props.history.push({
            pathname:'/checkout',
            search: queryString,
        });
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
        let order_summary = null;
        if (this.state.ingredients) {
            if (this.state.loading) {
                order_summary = <Spinner/>
            } else {
                order_summary = <OrderSummary
                    totalPrice={this.state.totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}/>
            }
        }


        let burger = (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls price={this.state.totalPrice}
                               purchasable={this.state.purchasable}
                               disabledInfo={disabledInfo}
                               removeIngredient={this.removeIngredientHandler}
                               addIngredient={this.addIngredientHandler}
                               ordered={this.purchaseHandler}
                /></React.Fragment>
        )
        if (!this.state.ingredients) {
            burger = this.state.error ? <p>Cannot load ingredients</p> : <Spinner/>
        }

        //disabledInfo.map(({_, amount}) => (amount > 0))
        // console.log(disabledInfo)

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

export default WithErrorHandler(BurgerBuilder, axios);
