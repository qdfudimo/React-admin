import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {
    composeWithDevTools
} from 'redux-devtools-extension'
import {
    reducer
} from './reducer'
import {
    createStore,
    applyMiddleware,
} from 'redux'
// const reducers = combineReducers(reducer);
const store = createStore(reducer, composeWithDevTools(applyMiddleware(logger, thunk)));
export {
    store
}