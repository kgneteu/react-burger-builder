import * as actionTypes from "./actionTypes";

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
   return {
       type: actionTypes.AUTH_INITIATE_AUTH,
       email: email,
       password: password,
       isSignUp: isSignUp,
   }
}

export const logOut = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceeded = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expiresIn) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expiresIn: expiresIn,
    }
}

export const setAuthRedirect = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path,
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_AUTH,
    }
}
