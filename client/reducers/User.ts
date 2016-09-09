/**
 * User
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */

"use strict";

import {Action} from "redux";

import {UserActions} from "../actions/User";

export interface UserState {
    type?: String
    online?: Boolean
    info?: Object
}

export const INIT_STATE = {
    online: false,
    info: {}
};

export function userReducer(state: UserState, action: UserState) {
    switch (action.type) {

        case UserActions.UPDATE_USER:
            return {
                online: state.online,
                info: action.info
            };

        case UserActions.CHECK_LOGIN:
            return {
                online: action.online,
                info: state.info
            };

        case UserActions.LOGIN:
            return {
                online: action.online,
                info: action.info
            };

        case UserActions.LOGOUT:
            return {
                online: false,
                info: {}
            };

        default:
            return state;
    }
}

