/**
 * User
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */
"use strict";
var fs = require("fs");
var config_1 = require("../config");
var index_1 = require("../Util/index");
var index_2 = require("../Model/index");
var UserModel = index_2.Model.User;
var avaList = [];
//  读取头像目录
_readFile(config_1.Config.avatarPath).then(function (files) {
    if (files && files.length) {
        files.forEach(function (item) {
            avaList.push(config_1.Config.avatarPath.replace("public", "") + "/" + item);
        });
    }
});
exports.UserController = {
    /**
     * 根据邮箱查找用户/创建用户
     * @param email     邮箱
     * @returns {Promise}
     */
    "findByEmailOrCreate": function (email) {
        var promise = new Promise(function (resolve, reject) {
            UserModel.find({ "email": email }, function (ex, user) {
                if (ex) {
                    reject(ex);
                }
                if (user.length) {
                    resolve(user[0]);
                }
                else {
                    user = new UserModel({
                        "name": email.split("@")[0],
                        "email": email,
                        "avatarUrl": avaList[index_1.Util.random(0, avaList.length - 1)],
                        "roomId": ""
                    });
                    user.save(function (ex, user) {
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
    "requestAddFriend": function (userId, targetId) {
        var promise = new Promise(function (resolve, reject) {
            UserModel.findById(targetId, function (ex, user) {
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
                user.save(function (ex, user) {
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
    "rejectAddFriend": function (userId, requestId) {
        var promise = new Promise(function (resolve, reject) {
            UserModel.findById(userId, function (ex, user) {
                if (ex) {
                    reject(ex);
                }
                //  删除本次好友请求
                user.friendRequest = user.friendRequest.filter(function (id) {
                    return id != requestId;
                });
                //  保存
                user.save(function (ex, user) {
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
    "agreeAddFriend": function (userId, friendId) {
        var promise = new Promise(function (resolve, reject) {
            //  查询用户
            UserModel.findById(userId, function (ex, user) {
                if (ex) {
                    reject(ex);
                }
                //  查询好友用户
                UserModel.findById(friendId, function (ex, fUser) {
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
                    if (fUser.friends.indexOf(userId) == -1) {
                        fUser.friends.push(userId);
                    }
                    //  先保存自己,再保存好友
                    user.save(function (ex, user) {
                        if (ex) {
                            reject(ex);
                        }
                        fUser.save(function (ex, fUser) {
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
    "deleteFriend": function (userId, friendId) {
        var promise = new Promise(function (resolve, reject) {
            //  把自己查出来
            UserModel.findById(userId, function (ex, user) {
                if (ex) {
                    reject(ex);
                }
                //  查询好友用户
                UserModel.findById(friendId, function (ex, fUser) {
                    if (ex) {
                        reject(ex);
                    }
                    //  更新自己和好友的列表
                    user.friends = user.friends.filter(function (id) {
                        return id != friendId;
                    });
                    fUser.friends = fUser.friends.filter(function (id) {
                        return id != userId;
                    });
                    //  先后保存
                    user.save(function (ex, user) {
                        if (ex) {
                            reject(ex);
                        }
                        fUser.save(function (ex, fUser) {
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
     * 用户加入一个房间
     * @param userId    用户id
     * @param roomId    房间id
     * @returns {Promise}
     */
    "joinRoom": function (userId, roomId) {
        var promise = new Promise(function (resolve, reject) {
            UserModel.findByIdAndUpdate(userId, {
                "$set": {
                    "roomId": roomId
                }
            }, function (ex, user) {
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
    "leaveRoom": function (userId, callback) {
        var promise = new Promise(function (resolve, reject) {
            UserModel.findByIdAndUpdate(userId, {
                "$set": {
                    "roomId": ""
                }
            }, function (ex, user) {
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
    "online": function (_userId) {
        var promise = new Promise(function (resolve, reject) {
            UserModel.findByIdAndUpdate(_userId, {
                "$set": {
                    "online": true
                }
            }, function (ex, user) {
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
    "offline": function (_userId) {
        var promise = new Promise(function (resolve, reject) {
            UserModel.findOneAndUpdate(_userId, {
                "$set": {
                    "online": false
                }
            }, function (ex, user) {
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
    "getOnlineUsers": function (roomId) {
        var promise = new Promise(function (resolve, reject) {
            UserModel.find({
                "roomId": roomId
            }, function (ex, users) {
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
    var prromise = new Promise(function (resolve, reject) {
        fs.readdir(path, function (ex, files) {
            if (ex) {
                reject(ex);
            }
            resolve(files);
        });
    });
    return prromise;
}
//# sourceMappingURL=User.js.map