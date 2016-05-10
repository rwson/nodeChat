/**
 * 程序主入口
 */

"use strict";

import React, {Component} from "react";
import ReactDOM from "react-dom";
import {createStore,combineReducers,compose,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {Router, Route} from "react-router";
import thunk from "redux-thunk";
import createBrowserHistory from "history/lib/createBrowserHistory";
import {routerReducer,routerMiddleware} from "react-router-redux";

import "whatwg-fetch";

import reducers from "./reducers";
import AppRouters from "./router";

import "../css/bootstrap.min.css";

const reducer = combineReducers({
    reducers,
    routing: routerReducer
});

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

const history = createBrowserHistory();

ReactDOM.render(<div>
    <Provider store={store}>
        <Router history={history} routes={AppRouters()}/>
    </Provider>
</div>, document.querySelector("#chatApp"));

