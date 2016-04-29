/**
 * 暴露数据相关Model
 */

"use strict";

const mongoose = require("mongoose");
const config = require("../config");

mongoose.connect(config.database);

exports.User = mongoose.model("User",require("./User"));
exports.Message = mongoose.model("Message",require("./Message"));
exports.Room = mongoose.model("Room",require("./Room"));