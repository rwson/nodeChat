/**
 * 房间表设计
 */

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Room = new Schema({
    "name": String,             //  房间名
    "creatorId": String,        //  创建用户的_id(支持删除房间)
    "users": [],                //  房间里的所有用户
    "roomType": {               //  房间类型(group[群聊]/single[两个好友之间私聊])
        "type": String,
        "default": "group"
    },
    "createAt": {               //  创建时间
        "type": Date,
        "default": Date.now
    }
});

module.exports = Room;
