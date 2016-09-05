/**
 * index
 * build by rwson @9/5/16
 * mail:rw_Song@sina.com
 * action config
 */

"use strict";

import * as CONSTANTS from "../constants/index";

/**
 * 检测用户是否登录
 * @param online    是否在线
 * @param userInfo  用户信息
 * @returns {{type: *, online: *, userInfo: *}}
 */
export function checkLogin(online, userInfo) {
    return {
        "type": CONSTANTS.CHECK_LOGIN,
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
        "type": CONSTANTS.LOGIN,
        "userInfo": userInfo
    };
}

/**
 * 登出成功
 * @returns {{type: *}}
 */
export function userLogout() {
    return {
        "type": CONSTANTS.LOGOUT
    };
}

/**
 * 用户下线
 * @returns {{type: *}}
 */
export function userOffline() {
    return {
        "type": CONSTANTS.USER_OFFLINE
    };
}

/**
 * 获取房间内用户
 * @param users     用户列表
 * @returns {{type: *, users: *}}
 */
export function getUsers(users) {
    return {
        "type": CONSTANTS.GET_USERS,
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
        "type": CONSTANTS.GET_MESSAGE,
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
        "type": CONSTANTS.GET_ROOMS,
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
        "type": CONSTANTS.UPDATE_ROOM_NAME,
        "roomName": name
    };
}

/**
 * 更新用户信息
 * @param  userInfo    用户信息
 * @return {{type: *, userInfo: *}}
 */
export function updateUserInfo(userInfo) {
    return {
        "type": CONSTANTS.UPDATE_USER_INFO,
        "userInfo": userInfo
    };
}



