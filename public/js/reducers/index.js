/**
 * App reducer
 */

"use strict";

import { CHECK_LOGIN, LOGIN, LOGOUT, USER_OFFLINE, GET_ROOMS } from "../constants";
import objectAssign from "object-assign";

//  默认state
const initialState = {
    "online": false,
    "rooms": [],
    "totalPages": 1,
    "currentPage": 1,
    "curState": "",
    "messages": [],
    "userInfo": {}
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {

        //  检测用户登录
        case CHECK_LOGIN:
            return objectAssign({}, state, {
                "online": action.online,
                "userInfo": action.userInfo
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
        case GET_ROOMS:
            return objectAssign({}, state, {
                "rooms": action.rooms
            });
            break;

        //  默认不匹配
        default :
            return state;
            break;
    }
}
