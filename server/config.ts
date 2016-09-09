/**
 * 配置参数
 */

"use strict";

export const Config = {
    "socket":{
        "main": "/",
        "rooms": "/rooms",
        "room": "/room",
        "my": "/my"
    },
    "database": "mongodb://127.0.0.1:27017/nodeChat",
    "port": 3000,
    "cookieSecret": "nodeChat",
    "maxAge": 60 * 1000 * 60 * 12,
    "db": "chat",
    "avatarPath": "public/avatar"
};