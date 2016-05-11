/**
 * Actions
 */

"use strict";

import { CHECK_LOGIN,LOGIN, LOGOUT, JOIN_ROOM, LEAVE_ROOM, POST_MESSAGE } from "../constants";

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
 * @returns {{type: *}}
 */
export function login() {
    return {
        "type": LOGIN
    };
}

/**
 * 登出成功
 * @returns {{type: *}}
 */
export function logot() {
    return {
        "type": LOGOUT
    };
}
