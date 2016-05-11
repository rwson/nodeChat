/**
 * 用户表设计
 */

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const User = new Schema({
    "email": String,
    "name": String,
    "avatarUrl": String,
    "online": Boolean,
    "friends": Array,
    "_roomId": ObjectId
});

module.exports = User;