/**
 * index
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */
"use strict";
var mongoose = require("mongoose");
var config_1 = require("../config");
var User_1 = require("./User");
var Message_1 = require("./Message");
var Room_1 = require("./Room");
mongoose.connect(config_1.config.database);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    User: User_1.default,
    Message: Message_1.default,
    Room: Room_1.default
};
//# sourceMappingURL=index.js.map