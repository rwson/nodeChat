/**
 * Actions
 */

"use strict";

import { CHECK_LOGIN,LOGIN, LOGOUT, USER_OFFLINE, JOIN_ROOM, LEAVE_ROOM, POST_MESSAGE } from "../constants";

/**
 * 检测用户是否登录
 * @param online    是否在线
 * @returns {{type: *, online: *}}
 */
export function checkLogin(online) {
    return {
        "type": CHECK_LOGIN,
        "online": online
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
