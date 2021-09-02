import {call, delay, put} from 'redux-saga/effects'
import * as actions from "../actions";
import axios from "axios";


export function* logoutSaga(action) {
    yield call([localStorage, "removeItem"], 'token')
    yield call([localStorage, "removeItem"], 'expirationDate')
    yield call([localStorage, "removeItem"], 'userId')

    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationDate')
    // yield localStorage.removeItem('userId')
    yield put(actions.logoutSucceeded())
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expiresIn * 1000)
    yield put(actions.logOut())
}

export function* authUserSaga(action) {
    yield put(actions.authStart());

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDi-2wgQZKlrLZIVsmSqLJcBUbOWJVPgFY';
    if (action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDi-2wgQZKlrLZIVsmSqLJcBUbOWJVPgFY';
    }
    try {
        const response = yield axios.post(url, authData)
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.authSuccess(response.data))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    } catch (error) {
        yield put(actions.authFail(error.response.data.error.message))
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logOut());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(actions.logOut());
        } else {
            const userId = yield localStorage.getItem('userId')
            yield put(actions.authSuccess({
                idToken: token,
                localId: userId
            }))
            const expiresIn = yield ((expirationDate.getTime() - new Date().getTime()) / 1000).toFixed()
            yield put(actions.checkAuthTimeout(expiresIn))
        }
    }
}
