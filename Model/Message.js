/**
 * 消息表设计
 */

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Message = new Schema({
    "content": String,
    "creator": {
        "_id": ObjectId,
        "email": String,
        "name": String,
        "avatarUrl": String
    },
    "_roomId": ObjectId,
    "createAt": {
        "type": Date,
        "default": Date.now
    }
});

module.exports = Message;
