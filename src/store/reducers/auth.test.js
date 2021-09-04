import reducer from './auth'
import * as actionTypes from "../actions/actionTypes";

describe('auth reducer', function () {
    it('should return initial state', function () {
        expect(reducer(undefined, {type: ''})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        });
    });
    it('should store token upon login', function () {
        expect(reducer(undefined, {type: actionTypes.AUTH_SUCCESS, token:'abc'})).toMatchObject({token: 'abc'})
    });
});
