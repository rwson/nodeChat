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
     * 根据房间
     * @param roomId
     * @returns {Promise}
     */
    "findRoomById": function (roomId) {
        var promise = new Promise((resolve, reject) => {
            RoomModel.findById(roomId, (ex, room) => {
                if (ex) {
                    reject(ex);
                }
                resolve(room);
            });
        });
        return promise;
    },

    /**
     * 获取房间列表
     * @param page      当前页
     * @param pageSize  每页查询多少条
     * @returns {Promise}
     */
    "getRooms": function (page = 1, pageSize = 10) {
        var promise = new Promise((resolve, reject) => {
            RoomModel.find().paginate(page, pageSize, (ex, rooms, total) => {
                if (ex) {
                    reject(ex);
                }
                resolve(rooms, total);
            });
        });
        return promise;
    },

    /**
     * 房间里新增用户
     * @param roomId    房间id
     * @param userId    用户id
     * @returns {Promise}
     */
    "joinRoom": function (roomId, userId) {
        var promise = new Promise((resolve, reject) => {
            RoomModel.findById(roomId, (ex, room) => {
                if (ex) {
                    reject(ex);
                }
                if (!room.users) {
                    room.users = [];
                }
                UserController.findUserById(userId).then((user) => {
                    room.users.push(user);
                    room.save((ex, room) => {
                        if (ex) {
                            reject(ex);
                        }
                        resolve(room);
                    });
                });
            });
        });
        return promise;
    },

    /**
     * 用户离开一个房间
     * @param roomId    房间id
     * @param userId    用户id
     * @returns {Promise}
     */
    "leaveRoom": function (roomId, userId, callback) {
        var promise = new Promise((resolve, reject) => {
            RoomModel.findById(roomId, (ex, room) => {
                if (ex) {
                    reject(ex);
                }
                room.users = room.users.filter((user) => userId !== user.id);
                room.save((ex, room) => {
                    if (ex) {
                        reject(ex);
                    }
                    resolve(room);
                });
            });
        });
        return promise;
    },

    /**
     * 新建一个房间
     * @param room      房间相关信息
     * @returns {Promise}
     */
    "addRoom": function (room) {
        let Room = new RoomModel(room);
        var promise = new Promise((resolve, reject) => {
            Room.save((ex, room) => {
                if (ex) {
                    reject(ex);
                }
                resolve(room);
            });
        });
        return promise;
    }

};
