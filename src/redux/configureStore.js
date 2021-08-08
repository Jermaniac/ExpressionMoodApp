
import { createStore, combineReducers} from 'redux';
import { expressions } from './expressions'
import { photo } from './photo'

const combination = combineReducers({
    expressions,
    photo
});

export const configureStore = () => {

    const store = createStore(
        combination,
        // activate redux dev tools in browser
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    );

    return store;
}
