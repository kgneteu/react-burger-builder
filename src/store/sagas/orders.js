import axios from "../../axios";
import {
    fetchOrdersFail,
    fetchOrdersStart,
    fetchOrdersSuccess,
    purchaseBurgerFail,
    purchaseBurgerStart,
    purchaseBurgerSuccess
} from "../actions";
import {put} from "redux-saga/effects";

export function* purchaseBurgerSaga(action) {
    yield put(purchaseBurgerStart())
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)
        yield put(purchaseBurgerSuccess(response.data.name, action.orderData))
    } catch (error) {
        yield put(purchaseBurgerFail(error))
    }
}

export function* fetchOrdersSaga(action) {
    yield put(fetchOrdersStart())
    const query = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/orders.json' + query)
        let fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({...response.data[key], id: key})
        }
        yield put(fetchOrdersSuccess(fetchedOrders))
    } catch (error) {
        yield put(fetchOrdersFail(error))

    }
}
