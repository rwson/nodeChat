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

//  读取头像目录
_readFile(Config.avatarPath).then((files) => {
    if (files && files.length) {
        files.forEach((item) => {
            avaList.push(`${Config.avatarPath.replace("public", "")}/${item}`);
        });
    }
});

module.exports = {

    /**
     * 根据邮箱查找用户/创建用户
     * @param email     邮箱
     * @returns {Promise}
     */
    "findByEmailOrCreate": (email) => {
        let promise = new Promise((resolve, reject) => {
            UserModel.find({ "email": email }, (ex, user) => {
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
     * 请求添加对方为好友
     * @param userId    用户id
     * @param targetId  目标用户id
     * @returns {Promise}
     */
    "requestAddFriend": (userId, targetId) => {
        let promise = new Promise((resolve, reject) => {
            UserModel.findById(targetId, (ex, user) => {
                if (ex) {
                    reject(ex);
                }
                if (!user.friendRequest) {
                    user.friendRequest = [];
                }
                if (user.friendRequest.indexOf(userId) == -1) {
                    user.friendRequest.push(userId);
                }
                //  更新对方数据并且保存
                user.save((ex, user) => {
                    if (ex) {
                        reject(ex);
                    }
                    resolve(user);
                });
            });
        });
        return promise;
    },

    /**
     * 拒绝添加对方为好友
     * @param userId     用户id
     * @param requestId  请求添加好友的用户id
     * @returns {Promise}
     */
    "rejectAddFriend": (userId, requestId) => {
        let promise = new Promise((resolve, reject) => {
            UserModel.findById(userId, (ex, user) => {
                if (ex) {
                    reject(ex);
                }

                //  删除本次好友请求
                user.friendRequest = user.friendRequest.filter((id) => {
                    return id != requestId;
                });

                //  保存
                user.save((ex, user) => {
                    if (ex) {
                        reject(ex);
                    }
                    resolve(user);
                });

            });
        });
        return promise;
    },

    /**
     * 同意添加好友
     * @param userId        用户id
     * @param friendId      好友id
     * @returns {Promise}
     */
    "agreeAddFriend": (userId, friendId) => {
        let promise = new Promise((resolve, reject) => {

            //  查询用户
            UserModel.findById(userId, (ex, user) => {
                if (ex) {
                    reject(ex);
                }

                //  查询好友用户
                UserModel.findById(friendId, (ex, fUser) => {
                    if (ex) {
                        reject(ex);
                    }

                    //  更新自己和好友用户的好友id列表
                    if (!user.friends) {
                        user.friends = [];
                    }

                    if (user.friends.indexOf(friendId) == -1) {
                        user.friends.push(friendId);
                    }

                    if (!fUser.friends) {
                        fUser.friends = [];
                    }

                    if(fUser.friends.indexOf(userId) == -1) {
                        fUser.friends.push(userId);
                    }

                    //  先保存自己,再保存好友
                    user.save((ex, user) => {
                        if (ex) {
                            reject(ex);
                        }

                        fUser.save((ex, fUser) => {
                            if (ex) {
                                reject(ex);
                            }

                            resolve(user);
                        });
                    });

                });

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

            //  把自己查出来
            UserModel.findById(userId, (ex, user) => {
                if(ex) {
                    reject(ex);
                }

                //  查询好友用户
                UserModel.findById(friendId, (ex,fUser) => {
                    if(ex) {
                        reject(ex);
                    }

                    //  更新自己和好友的列表
                    user.friends = user.friends.filter((id) => {
                        return id != friendId;
                    });

                    fUser.friends = fUser.friends.filter((id) => {
                        return id != userId;
                    });

                    //  先后保存
                    user.save((ex, user) => {
                        if(ex) {
                            reject(ex);
                        }

                        fUser.save((ex, fUser) => {
                            if(ex) {
                                reject(ex);
                            }

                            resolve(user);
                        });

                    });

                });

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
