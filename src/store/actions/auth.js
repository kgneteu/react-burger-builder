import * as actionTypes from "./actionTypes";
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
        token: authData.idToken,
        id: authData.localId,
    }
}

export const auth = (email, password, isSignUp = false) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDi-2wgQZKlrLZIVsmSqLJcBUbOWJVPgFY';
        if (isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDi-2wgQZKlrLZIVsmSqLJcBUbOWJVPgFY';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response.data)
                dispatch(authSuccess(response.data))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log('AAAA', {error})
                dispatch(authFail(error.response.data.error.message))
            });
    }
}

export const logOut = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expiresIn * 1000)
    }
}
