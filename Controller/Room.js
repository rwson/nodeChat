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
    "findRoomById": (roomId) => {
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
    "getRooms": (page = 1, pageSize = 10) => {
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
    "joinRoom": (roomId, userId) => {
        var promise = new Promise((resolve, reject) => {
            RoomModel.findById(roomId, (ex, room) => {
                if (ex) {
                    reject(ex);
                }
                if (!room.users) {
                    room.users = [];
                }
                UserController.findUserById(userId).then((user) => {
                    let flag = false;
                    room.users.forEach((user) => {
                        if (!flag && user._id == userId) {
                            flag = true;
                        }
                    });
                    if (user && !flag) {
                        room.users.push(user);
                        room.save((ex, room) => {
                            if (ex) {
                                reject(ex);
                            }
                            resolve(room);
                        });
                    } else {
                        resolve(room);
                    }
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
    "leaveRoom": (roomId, userId) => {
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
    "createRoom": (room) => {
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
    },

    /**
     * 根据房间id删除一个房间
     * @param id    房间id
     * @returns {Promise}
     */
    "deleteRoom": (id) => {
        var promise = new Promise((resolve, reject) => {
            RoomModel.findByIdAndRemove(id, (ex) => {
                if (ex) {
                    reject(ex);
                }
                resolve();
            });
        });
        return promise;
    }

};
