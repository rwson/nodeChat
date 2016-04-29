/**
 * 房间表控制器
 */

"use strict";

const Util = require("../Util");
const Model = require("../Model");
const UserModel = Model.User;
const RoomModel = Model.Room;

require("./_.mongoose.page");

module.exports = {

    /**
     * 获取房间列表
     * @param page      当前页
     * @param pageSize
     * @param callback
     */
    "getRooms": function (page, pageSize, callback) {
        RoomModel.find().paginate(page, pageSize, callback);
    }

};
