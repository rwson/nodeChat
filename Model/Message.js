/**
 * 消息表设计
 */

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Message = new Schema({
    "content": String,          //  消息内容
    "messageType": {            //  消息类型(系统[system]、用户[message])
        "type": String,
        "default": "user"
    },
    "creator": {                //  创建人
        "_id": ObjectId,        //  创建人id
        "email": String,        //  邮箱
        "name": String,         //  用户名
        "avatarUrl": String     //  头像
    },
    "roomId": ObjectId,         //  所属房间id
    "createAt": {               //  发送时间
        "type": Date,
        "default": Date.now
    }
});

module.exports = Message;
