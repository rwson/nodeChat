/**
 * Actions
 */

"use strict";

import { CHECK_LOGIN,LOGIN, LOGOUT, USER_OFFLINE, GET_MESSAGE, GET_USERS, GET_ROOMS, UPDATE_ROOM_NAME } from "../constants";

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
 * 获取房间内用户
 * @param users     用户列表
 * @returns {{type: *, users: *}}
 */
export function getUsers(users) {
    return {
        "type": GET_USERS,
        "users": users
    };
}

/**
 * 获取房间内的消息列表
 * @param messages  消息列表
 * @returns {{type: *, messages: *}}
 */
export function getMessages(messages) {
    return {
        "type": GET_MESSAGE,
        "messages": messages
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

/**
 * 更新房间名称
 * @param name  房间名称
 * @returns {{type: *, roomName: *}}
 */
export function updateRoomName(name){
    return {
        "type": UPDATE_ROOM_NAME,
        "roomName": name
    };
}
