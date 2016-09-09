/**
 * Room
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */

"use strict";

import {Action} from "redux";

import {RoomActions} from "../actions/Room";

export interface RoomState {
    type?: String
    users?: Array<Object>
    messages?: Array<Object>
}

export const INIT_STATE = {
    users: [],
    messages: []
};

export function roomReducer(state: RoomState, action: RoomState) {
    switch (action.type) {

        case RoomActions.GET_USERS:
            return {
                users: action.users,
                messages: state.messages
            };

        case RoomActions.GET_MESSAGES:
            return {
                users: state.users,
                messages: action.messages
            };

        default:
            return state;
    }
}

