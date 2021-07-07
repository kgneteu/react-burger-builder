import * as actionTypes from "./actionTypes";
import axios from "../../axios";


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const addIngredients = (ingredients) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                if (response?.data) {
                    //this.setState({ingredients: response.data})
                    dispatch(setIngredients(response.data));
                };
            })
            .catch(error => {
                //  this.setState({error: true})
                dispatch(fetchIngredientsFailed(error));
            })
    }
}



