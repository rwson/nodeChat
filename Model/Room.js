/**
 * 房间表设计
 */

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Room = new Schema({
    "name": String,             //  房间名
    "users": [],                //  房间里的所有用户
    "createAt": {               //  创建时间
        "type": Date,
        "default": Date.now
    }
});

module.exports = Room;
