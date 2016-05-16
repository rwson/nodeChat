/**
 * 配置参数
 */

"use strict";

module.exports = {
    "socket":{
        "main": "/",
        "rooms": "/rooms",
        "room": "/room",
        "my": "/my"
    },
    "database": "mongodb://115.28.88.79:27017/nodeChat",
    "port": 3000,
    "cookieSecret": "nodeChat",
    "maxAge": 60 * 1000 * 60 * 12,
    "db": "chat",
    "avatarPath": "public/avatar"
};

