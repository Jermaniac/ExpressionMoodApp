import { EXPRESSIONS } from '../shared/expressions';
import * as ActionTypes from './actionTypes'

export const expressions = ( state = EXPRESSIONS, action ) => {
    switch (action.type) {
        case ActionTypes.CHANGE_EXPRESSIONS:
            let expressions = action.payload.expressions;
            return expressions;
        default:
            return state;
    }
};