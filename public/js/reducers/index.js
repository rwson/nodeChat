/**
 * App reducer
 */

"use strict";

import { LOGIN, LOGOUT, JOIN_ROOM, LEAVE_ROOM, POST_MESSAGE } from "../constants";

const initialState = {
    "online": false,
    "rooms": [],
    "curRoute": "/",
    "messages": [],
    "userInfo": {}
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOGIN:
            state = Object.assign({}, state, {
                "online": true
            });
            break;
        case LOGOUT:
            state = Object.assign({}, state, {
                "online": false
            });
            break;
        case JOIN_ROOM:
            state = Object.assign({}, state, {
                "roomId": action.roomId
            });
            break;
        case LEAVE_ROOM:
            state = Object.assign({}, state, {
                "roomId": ""
            });
            break;
        case POST_MESSAGE:
            break;
        default :
            return state;
            break;
    }
}
