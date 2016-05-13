/**
 * Actions
 */

"use strict";

import { CHECK_LOGIN,LOGIN, LOGOUT, USER_OFFLINE, GET_ROOMS } from "../constants";

/**
 * 检测用户是否登录
 * @param online    是否在线
 * @param userInfo  用户信息
 * @returns {{type: *, online: *, userInfo: *}}
 */
export function checkLogin(online, userInfo) {
    return {
        "type": CHECK_LOGIN,
        "online": online,
        "userInfo": userInfo
    };
}

/**
 * 登录成功
 * @param userInfo      后端返回的用户信息
 * @returns {{type: *}}
 */
export function userLogin(userInfo) {
    return {
        "type": LOGIN,
        "userInfo": userInfo
    };
}

/**
 * 登出成功
 * @returns {{type: *}}
 */
export function userLogout() {
    return {
        "type": LOGOUT
    };
}

/**
 * 用户下线
 * @returns {{type: *}}
 */
export function userOffline() {
    return {
        "type": USER_OFFLINE
    };
}

/**
 * 获取所有房间数据
 * @param rooms     房间列表
 * @returns {{type: *, rooms: *}}
 */
export function getRooms(rooms) {
    return {
        "type": GET_ROOMS,
        "rooms": rooms
    };
}
