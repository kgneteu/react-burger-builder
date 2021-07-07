import * as actionTypes from "./actionTypes";
import {purchaseBurgerFail, purchaseBurgerStart, purchaseBurgerSuccess} from "./order";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData,
    }
}

export const auth = (email, password, isSignUp=false) =>{
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDi-2wgQZKlrLZIVsmSqLJcBUbOWJVPgFY';
        if (isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDi-2wgQZKlrLZIVsmSqLJcBUbOWJVPgFY';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response.data)
                dispatch(authSuccess(response.data))
            })
            .catch(error => {
                console.log(error)
                dispatch(authFail(error))
            });
    }
}
