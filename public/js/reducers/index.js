/**
 * App reducer
 */

"use strict";

import { CHECK_LOGIN, LOGIN, LOGOUT, USER_OFFLINE, GET_MESSAGE, GET_USERS, GET_ROOMS, UPDATE_ROOM_NAME } from "../constants";
import objectAssign from "object-assign";

//  默认state
const initialState = {
    "online": false,
    "rooms": [],
    "totalPages": 1,
    "currentPage": 1,
    "curState": "",
    "messages": [],
    "users": [],
    "roomName": "",
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
            return objectAssign({}, initialState);
            break;

        //  获取房间内的消息
        case GET_MESSAGE:
            return objectAssign({}, state, {
                "messages": action.messages
            });
            break;

        //  获取房间内的用户
        case GET_USERS:
            return objectAssign({}, state, {
                "users": action.users
            });
            break;

        //  获取房间列表
        case GET_ROOMS:
            return objectAssign({}, state, {
                "rooms": action.rooms
            });
            break;

        //  更新房间名称
        case UPDATE_ROOM_NAME:
            return objectAssign({}, state, {
                "roomName": action.roomName
            });

        //  默认不匹配
        default :
            return state;
            break;
    }
}
