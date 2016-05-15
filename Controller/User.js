/**
 * 用户表控制器
 */

"use strict";

const fs = require("fs");
const Config = require("../config");
const Util = require("../Util");
const Model = require("../Model");
const UserModel = Model.User;

let avaList = [];

//	读取头像目录
_readFile(Config.avatarPath).then((files) => {
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
    "findUserById": (_userId) => {
        let promise = new Promise((resolve, reject) => {
            UserModel.findById(_userId, (ex, user) => {
                if (ex) {
                    reject(ex);
                }
                resolve(user);
            });
        });
        return promise;
    },

    /**
     * 根据邮箱查找用户/创建用户
     * @param email     邮箱
     * @returns {Promise}
     */
    "findByEmailOrCreate": (email) => {
        let promise = new Promise((resolve, reject) => {
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
                        "avatarUrl": avaList[Util.random(0, avaList.length - 1)],
                        "roomId": ""
                    });
                    user.save((ex, user) => {
                        if (ex) {
                            reject(ex);
                        }
                        resolve(user);
                    });
                }
            });
        });
        return promise;
    },

    /**
     * 请求添加对方好友
     * @param userId    用户id
     * @param targetId  目标用户id
     * @returns {Promise}
     */
    "requestFriend": (userId, targetId) => {
        let promise = new Promise((resolve, reject) => {
            this.findUserById(targetId)
                .then((user) => {
                    if (!user.friendRequest) {
                        user.friendRequest = [];
                    }
                    user.friendRequest.push(userId);
                    //  更新对方数据并且保存
                    user.save((ex, user) => {
                        if (ex) {
                            reject(ex);
                        }
                        resolve(user);
                    });
                })
                .catch((ex) => {
                    reject(ex);
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
    "addFriend": (userId, friendId) => {
        let promise = new Promise((resolve, reject) => {
            //  先查询用户
            this.findUserById((userId))
                .then((user) => {
                    if (user) {
                        //  再查询请求用户
                        this.findUserById(friendId)
                            .then((Fuser) => {
                                let index = user.friendRequest.indexOf(friendId);
                                if (!user.friends) {
                                    user.friends = [];
                                }
                                user.friends.push(Fuser);
                                if (index > -1) {
                                    user.friendRequest.splice(index, 1);
                                }
                                //  更新用户的一些信息并且保存
                                user.save((ex, user) => {
                                    if (ex) {
                                        reject(ex);
                                    }
                                    resolve(user);
                                });
                            })
                            .catch((ex) => {
                                reject(ex);
                            });
                    }
                }).catch((ex) => {
                    reject(ex);
                });
        });
        return promise;
    },

    /**
     * 删除好友
     * @param userId        用户id
     * @param friendId      好友id
     * @returns {Promise}
     */
    "deleteFriend": (userId, friendId) => {
        let promise = new Promise((resolve, reject) => {
            this.findUserById(userId)
                .then((user) => {
                    user.friends = user.friends.filter((item) => {
                        return item._id != friendId;
                    });
                    user.save((ex, user) => {
                        if (ex) {
                            reject(ex);
                        }
                        resolve(user);
                    });
                })
                .catch((ex) => {
                    reject(ex);
                });
        });
        return promise;
    },

    /**
     * 用户加入一个房间
     * @param userId    用户id
     * @param roomId    房间id
     * @returns {Promise}
     */
    "joinRoom": (userId, roomId) => {
        let promise = new Promise((resolve, reject) => {
            UserModel.findByIdAndUpdate(userId, {
                "$set": {
                    "roomId": roomId
                }
            }, (ex, user) => {
                if (ex) {
                    reject(ex);
                }
                UserModel.findById(userId, (ex, user) => {
                    console.log(user);
                });
                resolve(user);
            });
        });
        return promise;
    },

    /**
     * 用户离开房间
     * @param userId    用户id
     * @returns {Promise}
     */
    "leaveRoom": (userId, callback) => {
        let promise = new Promise((resolve, reject) => {
            UserModel.findByIdAndUpdate(userId, {
                "$set": {
                    "roomId": ""
                }
            }, (ex, user) => {
                if (ex) {
                    reject(ex);
                }
                resolve(user);
            });
        });
        return promise;
    },

    /**
     * 用户上线
     * @param _userId   用户id
     * @returns {Promise}
     */
    "online": (_userId) => {
        let promise = new Promise((resolve, reject) => {
            console.log();
            UserModel.findByIdAndUpdate(_userId, {
                "$set": {
                    "online": true
                }
            }, (ex, user) => {
                if (ex) {
                    reject(ex);
                }
                resolve(user);
            });
        });
        return promise;
    },

    /**
     * 用户下线
     * @param _userId   用户id
     * @returns {Promise}
     */
    "offline": (_userId) => {
        let promise = new Promise((resolve, reject) => {
            UserModel.findOneAndUpdate(_userId, {
                "$set": {
                    "online": false
                }
            }, (ex, user) => {
                if (ex) {
                    reject(ex);
                }
                resolve(user);
            });
        });
        return promise;
    },

    /**
     * 获取特定房间内的用户
     * @param roomId    房间id
     * @returns {Promise}
     */
    "getOnlineUsers": (roomId) => {
        let promise = new Promise((resolve, reject) => {
            UserModel.find({
                "roomId": roomId
            }, (ex, users) => {
                if (ex) {
                    reject(ex);
                }
                resolve(users);
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
    let prromise = new Promise((resolve, reject) => {
        fs.readdir(path, (ex, files) => {
            if (ex) {
                reject(ex);
            }
            resolve(files);
        });
    });
    return prromise;
}
