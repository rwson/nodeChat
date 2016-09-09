/**
 * User
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */
"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var User = new Schema({
    "email": String,
    "name": String,
    "avatarUrl": String,
    "online": Boolean,
    "friends": Array,
    "friendRequest": Array,
    "roomId": String //  当前所在房间的id
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
//# sourceMappingURL=User.js.map