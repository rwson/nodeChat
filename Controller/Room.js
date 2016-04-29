/**
 * 房间表控制器
 */

"use strict";

const Util = require("../Util");
const Model = require("../Model");
const RoomModel = Model.Room;
const UserController = require("./User");

module.exports = {

    /**
     * 获取房间列表
     * @param page      当前页
     * @param pageSize
     * @param callback
     */
    "getRooms": function (page, pageSize, callback) {
        RoomModel.find().paginate(page, pageSize, callback);
    },

    /**
     *
     * @param roomId
     * @param userId
     * @param callback
     */
    "joinRoom": function (roomId, userId, callback) {
        RoomModel.findById(roomId, (ex, room) => {
            if (ex) {
                return callback(ex);
            }
            if (!room.users) {
                room.users = [];
            }
            UserController.findUserById(userId, (ex, user) => {
                if (ex) {
                    return callback(ex);
                }
                room.push(user);
                room.save(callback);
            });
        });
    },

    /**
     * 用户离开一个房间
     * @param roomId
     * @param userId
     * @param callback
     */
    "leaveRoom": function (roomId, userId, callback) {
        RoomModel.findById(roomId, (ex, room) => {
            if (ex) {
                return callback(ex);
            }
            room.users = room.users.filter((user) => {
                return user.id !== userId;
            });
            room.save(callback);
        });
    },

    /**
     * 新建一个房间
     * @param room      房间的一些信息
     * @param callback  回调函数
     */
    "addRoom": function (room, callback) {
        let Room = new RoomModel(room);
        Room.save(callback);
    }

};
