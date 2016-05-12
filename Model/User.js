/**
 * 用户表设计
 */

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const User = new Schema({
    "email": String,            //  邮箱
    "name": String,             //  用户名
    "avatarUrl": String,        //  头像
    "online": Boolean,          //  是否在线
    "friends": Array,           //  好友列表
    "friendRequest":Array,      //  好友请求
    "_roomId": ObjectId         //  当前所在房间的id
});

module.exports = User;