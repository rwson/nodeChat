/**
 * Room
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */

"use strict";

import {Util} from "../Util/index";
import {Model} from "../Model/index";
import {UserController} from "./User";

const RoomModel = Model.Room;
const UserModel = Model.User;

export const RoomController = {
    /**
     * 根据房间
     * @param roomId
     * @returns {Promise}
     */
    "findRoomById": (roomId) => {
        let promise = new Promise((resolve, reject) => {
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
        let promise = new Promise((resolve, reject) => {
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
        let promise = new Promise((resolve, reject) => {
            RoomModel.findById(roomId, (ex, room) => {
                let usersList = room.users;
                if (ex) {
                    reject(ex);
                }
                if (Util.isEmpty(usersList)) {
                    usersList = [];
                }
                UserModel.findById(userId, (ex, user) => {
                    if (ex) {
                        reject(ex);
                    }
                    let flag = false;
                    if (user) {
                        if (usersList.length) {
                            room.users.forEach((user) => {
                                if (!flag && user._id == userId) {
                                    flag = true;
                                }
                            });
                        }
                        //  用户不存在房间的用户列表
                        if (!flag) {
                            usersList.push(user);
                            room.users = usersList;
                            room.save((ex, room) => {
                                if (ex) {
                                    reject(ex);
                                }
                                resolve(room);
                            });
                        } else {
                            resolve(room);
                        }
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
        let users = [];
        let promise = new Promise((resolve, reject) => {
            try {
                RoomModel.findById(roomId, (ex, room) => {
                    if (ex) {
                        reject(ex);
                    }
                    //  过滤用户
                    users = room.users.filter((user) => {
                        return userId != user._id;
                    });
                    room.users = users;
                    room.save((ex, room) => {
                        if (ex) {
                            reject(ex);
                        }
                        resolve(room);
                    });
                });
            } catch (ex) {
                console.log(ex);
            }
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
        let promise = new Promise((resolve, reject) => {
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
        let promise = new Promise((resolve, reject) => {
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


