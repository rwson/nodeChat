/**
 * Rooms
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */

"use strict";

import {Action} from "redux";

import {RoomsActions} from "../actions/Rooms";

export interface RoomsState {
    type?: String
    rooms: Array<Object>
}

export const INIT_STATE = {
    rooms: []
};

export function roomReducer(state: RoomsState, action: RoomsState) {
    switch (action.type) {

        case RoomsActions.FETCH_ROOM:
            return {
                rooms: action.rooms
            };

        case RoomsActions.CREATE_ROOM:
        default:
            return state;
    }
}
