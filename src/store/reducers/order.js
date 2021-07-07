import * as actionTypes from './../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null,
}

const orderReducer = (state = initialState, action) => {
    function purchaseBurgerSuccess() {
        const newOrder = {
            ...action.orderData,
            id: action.orderId,
        }
        return {
            ...state,
            loading: false,
            purchased: true,
            orders: state.orders.concat(newOrder)
        };
    }

    function purchaseBurgerFail() {
        return {
            ...state,
            loading: false,
        };
    }

    function purchaseBurgerStart() {
        return {
            ...state,
            loading: true,
        }
    }

    function fetchOrdersSuccess() {
        return {
            ...state,
            loading: false,
            orders: [...action.orders]
        };
    }

    function fetchOrdersFail() {
        return {
            ...state,
            loading: false,
        };
    }

    function fetchOrdersStart() {
        return {
            ...state,
            loading: true,
        }
    }

    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess();
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail();
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart();
        case actionTypes.PURCHASE_INIT:
            return {...state, purchased: false,}
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess();
        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrdersFail();
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart();
        case actionTypes.FETCH_ORDERS_INIT:
            return {...state}
        default:
            return state;
    }
}

export default orderReducer;
