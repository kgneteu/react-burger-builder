import * as actionTypes from '../actions/actionTypes'

const initialState = {
    // ingredients: {
    //     salad: 0,
    //     meat: 0,
    //     cheese: 0,
    //     bacon: 0,
    // },
    ingredients: null,
    totalPrice: 4,
    error: false,
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7,
}

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: {

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            }
        }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            }
        case actionTypes.SET_INGREDIENTS:
        case actionTypes.ADD_INGREDIENTS:{
            const updatedState = {...state};
            //set custom order of ingredients
            updatedState.ingredients={
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat,
            }
            let updatedPrice = initialState.totalPrice;
            for (let key in updatedState.ingredients) {
                updatedPrice += updatedState.ingredients[key] * INGREDIENT_PRICES[key];
            }
            updatedState.totalPrice = updatedPrice;
            return updatedState;

        }
        case actionTypes.FETCH_INGREDIENTS_FAILED:{
            return {
                ...state,
                error: true,
            }
        }

        default:
            return state;
    }

}
export default burgerBuilderReducer;

