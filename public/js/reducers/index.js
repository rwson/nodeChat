/**
 * App reducer
 */

"use strict";

import { CHECK_LOGIN, LOGIN, LOGOUT, USER_OFFLINE, JOIN_ROOM, LEAVE_ROOM, POST_MESSAGE } from "../constants";
import objectAssign from "object-assign";

//  默认state
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
                "online": true,
                "userInfo": action.userInfo
            });
            break;

        //  登出成功
        case LOGOUT:
            return objectAssign({}, state, {
                "online": false
            });
            break;

        //  用户退出登录,所以state全部还原
        case USER_OFFLINE:
            return initialState;
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
