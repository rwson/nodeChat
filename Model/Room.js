/**
 * 房间表设计
 */

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Room = new Schema({
    "name": String,             //  房间名
    "creatorId": ObjectId,      //  创建用户的_id(支持删除房间)
    "users": [],                //  房间里的所有用户
    "createAt": {               //  创建时间
        "type": Date,
        "default": Date.now
    }
});

module.exports = Room;
