import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import reducers from './reducers';
import { composeWithDevTools } from "redux-devtools-extension";

const env = process.env.NODE_ENV;
const history = createBrowserHistory();
const middlewares = [thunk, routerMiddleware(history)];
let store;

if (env === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

if (env === "development") {
    store = initialState => createStore(
        reducers(history),
        composeWithDevTools(applyMiddleware(...middlewares)),
    );
} else {
    store = initialState => createStore(
        reducers(history),
        compose(applyMiddleware(...middlewares)),
    );
}



export { history };
export default store();