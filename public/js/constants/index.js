/**
 * 一些常量配置
 */

"use strict";

export default ({

    //  socket配置地址
    "SOCKET_ADDRESS": {
        "main": "http://127.0.0.1:4000",
        "rooms": "http://127.0.0.1:4000/rooms",
        "room": "http://127.0.0.1:4000/room",
        "my": "http://127.0.0.1:4000/my"
    },

    //  检测用户是否登录
    "CHECK_LOGIN": "CHECK_LOGIN",

    //  登录
    "LOGIN": "LOGIN",

    //  登出
    "LOGOUT": "LOGOUT",

    //  用户下线
    "USER_OFFLINE": "USER_OFFLINE",

    //  加入房间
    "FETCH_ROOM": "FETCH_ROOM",

    //  创建房间
    "CREATE_ROOM": "CREATE_ROOM",

    //  加入房间
    "JOIN_ROOM": "JOIN_ROOM",

    //  退出房间
    "LEAVE_ROOM": "LEAVE_ROOM",

    //  发送信息
    "POST_MESSAGE": "POST_MESSAGE",

    //  获取房间内的消息
    "GET_MESSAGE": "GET_MESSAGE",

    //  获取房间内用户
    "GET_USERS": "GET_USERS",

    //  获取房间列表
    "GET_ROOMS": "GET_ROOMS",

    //  更新房间名
    "UPDATE_ROOM_NAME": "UPDATE_ROOM_NAME"

});
