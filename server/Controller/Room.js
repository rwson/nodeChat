/**
 * Room
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */
"use strict";
var index_1 = require("../Util/index");
var index_2 = require("../Model/index");
var RoomModel = index_2.Model.Room;
var UserModel = index_2.Model.User;
exports.RoomController = {
    /**
     * 根据房间
     * @param roomId
     * @returns {Promise}
     */
    "findRoomById": function (roomId) {
        var promise = new Promise(function (resolve, reject) {
            RoomModel.findById(roomId, function (ex, room) {
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
    "getRooms": function (page, pageSize) {
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        var promise = new Promise(function (resolve, reject) {
            RoomModel.find().paginate(page, pageSize, function (ex, rooms, total) {
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
        var promise = new Promise(function (resolve, reject) {
            RoomModel.findById(roomId, function (ex, room) {
                var usersList = room.users;
                if (ex) {
                    reject(ex);
                }
                if (index_1.Util.isEmpty(usersList)) {
                    usersList = [];
                }
                UserModel.findById(userId, function (ex, user) {
                    if (ex) {
                        reject(ex);
                    }
                    var flag = false;
                    if (user) {
                        if (usersList.length) {
                            room.users.forEach(function (user) {
                                if (!flag && user._id == userId) {
                                    flag = true;
                                }
                            });
                        }
                        //  用户不存在房间的用户列表
                        if (!flag) {
                            usersList.push(user);
                            room.users = usersList;
                            room.save(function (ex, room) {
                                if (ex) {
                                    reject(ex);
                                }
                                resolve(room);
                            });
                        }
                        else {
                            resolve(room);
                        }
                    }
                    else {
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
    "leaveRoom": function (roomId, userId) {
        var users = [];
        var promise = new Promise(function (resolve, reject) {
            try {
                RoomModel.findById(roomId, function (ex, room) {
                    if (ex) {
                        reject(ex);
                    }
                    //  过滤用户
                    users = room.users.filter(function (user) {
                        return userId != user._id;
                    });
                    room.users = users;
                    room.save(function (ex, room) {
                        if (ex) {
                            reject(ex);
                        }
                        resolve(room);
                    });
                });
            }
            catch (ex) {
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
    "createRoom": function (room) {
        var Room = new RoomModel(room);
        var promise = new Promise(function (resolve, reject) {
            Room.save(function (ex, room) {
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
    "deleteRoom": function (id) {
        var promise = new Promise(function (resolve, reject) {
            RoomModel.findByIdAndRemove(id, function (ex) {
                if (ex) {
                    reject(ex);
                }
                resolve();
            });
        });
        return promise;
    }
};
//# sourceMappingURL=Room.js.map