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
import {purchaseInit} from "../../store/actions/";


class BurgerBuilder extends Component {
    state = {
        //purchasable: false,
        purchasing: false,
        // loading: false,
        // error: false,
    }

    componentDidMount() {

        // axios.get('/ingredients.json')
        //     .then(response => {
        //         if (response?.data) this.setState({ingredients: response.data})
        //     }).catch(err => {
        //     this.setState({error: true})
        // })

        //REDUX
        //method 1 run async here
        // axios.get('/ingredients.json')
        //      .then(response => {
        //          if (response?.data) {
        //              //this.setState({ingredients: response.data})
        //              this.props.onAddIngredients(response.data);
        //          }
        //      }).catch(err => {
        //      this.setState({error: true})
        //  })
        //method 2
        //see BurgerBuilder actions
        this.props.onInitIngredients();
    }


    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.props.ingredients) {
        //     queryParams.push(
        //         encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i])
        //     )
        // }
        // queryParams.push('price=' + this.props.price)
        // const queryString = '?' + queryParams.join('&')
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: queryString,
        // });
        //redux now
        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
        });
    }

    // updatePurchaseState = () => {
    //
    //     const ingredientsTotal = Object.values({...this.props.ingredients})
    //         .reduce((total, current, index, arr) => {
    //             return total + current
    //         });
    //     this.setState({purchasable: ingredientsTotal > 0})
    // }

    updatePurchaseState = () => {
        const ingredientsTotal = Object.values({...this.props.ingredients})
            .reduce((total, current, index, arr) => {
                return total + current
            });
        return (ingredientsTotal > 0)
    }
    // addIngredientHandler = (type) => {
    //     // const ingredients = {...this.props.ingredients};
    //     //
    //     // ingredients[type] = ingredients[type] + 1;
    //     this.props.onIngredientAdded(type)
    //     this.setState({ingredients}, () => this.updatePurchaseState())
    //     this.setState({totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]}
    //     )
    //
    // }
    //
    // removeIngredientHandler = (type) => {
    //     const ingredients = {...this.state.ingredients};
    //     if (ingredients[type] > 0) {
    //         ingredients[type] = ingredients[type] - 1;
    //         this.setState({ingredients}, () => this.updatePurchaseState())
    //         this.setState({totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]})
    //     }
    // }

    render() {
        console.log(this.props)
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



        let burger = null;
        if (!this.props.ingredients) {
            burger = this.props.error ? <p>Cannot load ingredients</p> : <Spinner/>
        } else {
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        price={this.props.price}
                        purchasable={this.updatePurchaseState()}
                        disabledInfo={disabledInfo}
                        removeIngredient={this.props.onIngredientRemoved}
                        addIngredient={this.props.onIngredientAdded}
                        ordered={this.purchaseHandler}
                    /></React.Fragment>
            )
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


// const mapDispatchToProps = (dispatch) => {
//     return {
//         onIngredientAdded: (ingredientName) => dispatch({
//             type: actionTypes.ADD_INGREDIENT,
//             ingredientName: ingredientName
//         }),
//         onIngredientRemoved: (ingredientName) => dispatch({
//             type: actionTypes.REMOVE_INGREDIENT,
//             ingredientName: ingredientName
//         })
//     }
// }

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(burgerBuilderActions.removeIngredient(ingredientName)),
        onAddIngredients: (ingredients) => dispatch(burgerBuilderActions.addIngredients(ingredients)),
        onInitIngredients: ()=> dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: ()=>dispatch(purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
