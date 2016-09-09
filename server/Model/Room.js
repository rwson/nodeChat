/**
 * Room
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */
"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Room = new Schema({
    "name": String,
    "creatorId": String,
    "users": [],
    "roomType": {
        "type": String,
        "default": "group"
    },
    "createAt": {
        "type": Date,
        "default": Date.now
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Room;
//# sourceMappingURL=Room.js.map