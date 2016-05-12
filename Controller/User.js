/**
 * 用户表控制器
 */

"use strict";

const fs = require("fs");
const Config = require("../config");
const Util = require("../Util");
const Model = require("../Model");
const UserModel = Model.User;

var avaList = [];

//	读取头像目录
_readFile(Config.avatarPath).then(function (files) {
    if (files && files.length) {
        files.forEach((item) => {
            avaList.push(`${Config.avatarPath.replace("public", "")}/${item}`);
        });
    }
});

module.exports = {

    /**
     * 根据Id查询用户
     * @param _userId       用户id
     * @returns {Promise}
     */
    "findUserById": function (_userId) {
        var promise = new Promise((resolve, reject) => {
            try {
                UserModel.findById(_userId, (ex, user) => {
                    if (ex) {
                        reject(ex);
                    } else {
                        resolve(user);
                    }
                });
            } catch (e) {
                console.log("出错了");
            }
        });
        return promise;
    },

    /**
     * 根据邮箱查找用户/创建用户
     * @param email     邮箱
     * @returns {Promise}
     */
    "findByEmailOrCreate": function (email) {
        var promise = new Promise((resolve, reject) => {
            UserModel.find({"email": email}, (ex, user) => {
                if (ex) {
                    reject(ex);
                }
                if (user.length) {
                    resolve(user[0]);
                } else {
                    user = new UserModel({
                        "name": email.split("@")[0],
                        "email": email,
                        "avatarUrl": avaList[Util.random(0, avaList.length - 1)]
                    });
                    user.save((ex, user) => {
                        if (ex) {
                            reject(ex);
                        } else {
                            resolve(user);
                        }
                    });
                }
            });
        });
        return promise;
    },

    /**
     * 添加好友
     * @param userId        用户id
     * @param friendId      好友id
     * @returns {Promise}
     */
    "addFriend": function (userId, friendId) {
        var promise = new Promise();
        return promise;
    },

    /**
     * 删除好友
     * @param userId        用户id
     * @param friendId      好友id
     * @returns {Promise}
     */
    "deleteFriend": function (userId, friendId) {
        var promise = new Promise();
        return promise;
    },

    /**
     * 用户加入一个房间
     * @param userId    用户id
     * @param roomId    房间id
     * @returns {Promise}
     */
    "joinRoom": function (userId, roomId) {
        var promise = new Promise((resolve, reject) => {
            UserModel.findOneAndUpdate(userId, {
                "$set": {
                    "_roomId": roomId
                }
            }, (ex, user) => {
                if (ex) {
                    reject(ex);
                } else {
                    resolve(user);
                }
            });
        });
        return promise;
    },

    /**
     * 用户离开房间
     * @param userId    用户id
     * @returns {Promise}
     */
    "leaveRoom": function (userId) {
        var promise = new Promise((resolve, reject) => {
            var promise = new Promise((resolve, reject) => {
                UserModel.findByIdAndUpdate(userId, {
                    "$set": {
                        "_roomId": ""
                    }
                }, (ex, user) => {
                    if (ex) {
                        reject(ex);
                    } else {
                        resolve(user);
                    }
                });
            });
        });
        return promise;
    },

    /**
     * 用户上线
     * @param _userId   用户id
     * @returns {Promise}
     */
    "online": function (_userId) {
        var promise = new Promise((resolve, reject) => {
            console.log();
            UserModel.findByIdAndUpdate(_userId, {
                "$set": {
                    "online": true
                }
            }, (ex, user) => {
                if (ex) {
                    reject(ex);
                } else {
                    resolve(user);
                }
            });
        });
        return promise;
    },

    /**
     * 用户下线
     * @param _userId   用户id
     * @returns {Promise}
     */
    "offline": function (_userId) {
        var promise = new Promise((resolve, reject) => {
            UserModel.findOneAndUpdate(_userId, {
                "$set": {
                    "online": false
                }
            }, (ex, user) => {
                if (ex) {
                    reject(ex);
                } else {
                    resolve(user);
                }
            });
        });
        return promise;
    },

    /**
     * 获取在线用户
     * @returns {Promise}
     */
    "getOnlineUsers": function () {
        var promise = new Promise((resolve, reject) => {
            UserModel.find({
                "online": true
            }, (ex, users) => {
                if (ex) {
                    reject(ex);
                } else {
                    resolve(users);
                }
            });
        });
        return promise;
    }

};

/**
 * 异步读取文件
 * @param path      目标路径
 * @returns {Promise}
 */
function _readFile(path) {
    var prromise = new Promise((resolve, reject) => {
        fs.readdir(path, (ex, files) => {
            if (ex) {
                reject(ex);
            } else {
                resolve(files);
            }
        });
    });
    return prromise;
}
