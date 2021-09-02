import {all, takeEvery, takeLatest} from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import {authCheckStateSaga, authUserSaga, checkAuthTimeoutSaga, logoutSaga} from "./auth";
import {initIngredientsSaga} from "./burgerBuilder";
import {fetchOrdersSaga, purchaseBurgerSaga} from "./orders";


export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INITIATE_AUTH, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_AUTH, authCheckStateSaga)
    ])

}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrders() {
    yield takeLatest(actionTypes.PURCHASE_BURGER_INIT, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS_SAGA_INIT, fetchOrdersSaga);
}
