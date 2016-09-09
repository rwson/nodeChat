/**
 * Message
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */
"use strict";
"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var Message = new Schema({
    "content": String,
    "creator": {
        "_id": ObjectId,
        "email": String,
        "name": String,
        "avatarUrl": String //  头像
    },
    "roomId": ObjectId,
    "createAt": {
        "type": Date,
        "default": Date.now
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Message;
//# sourceMappingURL=Message.js.map