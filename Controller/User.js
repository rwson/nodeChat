/**
 * 用户表控制器
 */

"use strict";

const fs = require("promised-node").load("fs");
const Config = require("../config");
const Util = require("../Util");
const Model = require("../Model");
const UserModel = Model.User;

var avaList = [];

//	读取头像目录
fs.readdir(Config.avatarPath)
    .then((files) => {
            if(files && files.length){
                files.forEach((item) => {
                    avaList.push(`${Config.avatarPath.replace("public","")}/${item}`);
                });
            }
        });

module.exports = {

    /**
     * 根据Id查询用户
     * @param  {[type]}   _userId  [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    "findUserById": function(_userId, callback) {
        UserModel.findById(_userId, callback);
    },

    /**
     * 根据邮箱查找用户/创建用户
     * @param  {[type]}   email    [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    "findByEmailOrCreate": function(email, callback) {
        UserModel.find({
            "email": email
        }, function(err, user) {
            if (user) {
                return callback(null, user);
            }
            user = new UserModel({
                "name": email.split("@")[0],
                "email": email,
                "avatarUrl": avaList[Util.random(0,avaList.length - 1)]
            });
            user.save(callback);
        });
    },

    /**
     * 加入房间
     * @param join
     * @param callback
     */
    "joinRoom": function(join, callback) {
        UserModel.findOneAndUpdate({
            "_id": join.user._id
        }, {
            "$set": {
                "online": true,
                "_roomId": join.room._id
            }
        }, callback);
    },

    /**
     * 用户上线
     * @param  {[type]}   _userId  [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    "online": function(_userId, callback) {
        UserModel.findOneAndUpdate({
            "_id": _userId
        }, {
            "$set": {
                "online": true
            }
        }, callback);
    },

    /**
     * 用户下线
     * @param  {[type]}   _userId  [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    "offline": function(_userId, callback) {
        UserModel.findOneAndUpdate({
            "_id": _userId
        }, {
            "$set": {
                "online": false
            }
        }, callback);
    },

    /**
     * 获取在线用户
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    "getOnlineUsers": function(callback) {
        UserModel.find({
            "online": true
        }, callback);
    }

};
