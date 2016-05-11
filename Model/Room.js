/**
 * 房间表设计
 */

"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Room = new Schema({
    "name": String,
    "users": [],
    "createAt": {
        "type": Date,
        "default": Date.now
    }
});

module.exports = Room;
