import axios from "../../axios";
import {fetchIngredientsFailed, setIngredients} from "../actions";
import {put} from "redux-saga/effects";

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('/ingredients.json')
        yield put(setIngredients(response.data));
    } catch (error) {
        yield put(fetchIngredientsFailed(error));
    }
}
