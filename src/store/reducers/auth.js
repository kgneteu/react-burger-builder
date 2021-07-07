import * as actionTypes from '../actions/actionTypes'

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return state;
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.AUTH_SUCCESS:
            return state;
        default:
            return state;
    }
}
