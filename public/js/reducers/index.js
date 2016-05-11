/**
 * App reducer
 */

"use strict";

import { CHECK_LOGIN, LOGIN, LOGOUT, JOIN_ROOM, LEAVE_ROOM, POST_MESSAGE } from "../constants";
import objectAssign from "object-assign";

const initialState = {
    "online": false,
    "rooms": [],
    "curState": "",
    "messages": [],
    "userInfo": {}
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        //  检测用户登录
        case CHECK_LOGIN:
            return objectAssign({}, state, {
                "online": action.online
            });
            break;

        //  登录成功
        case LOGIN:
            return objectAssign({}, state, {
                "online": true
            });
            break;

        //  登出成功
        case LOGOUT:
            return objectAssign({}, state, {
                "online": false
            });
            break;

        //  加入房间
        case JOIN_ROOM:
            return objectAssign({}, state, {
                "roomId": action.roomId
            });
            break;

        //  离开房间
        case LEAVE_ROOM:
            return objectAssign({}, state, {
                "roomId": ""
            });
            break;

        //  发送消息
        case POST_MESSAGE:
            break;
        default :
            return state;
            break;
    }
}
