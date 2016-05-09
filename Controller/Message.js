/**
 * 消息表控制器
 */

"use strict";

const Model = require("../Model");
const MessageModel = Model.Message;

module.exports = {

    /**
     * 根据roomId获取信息
     * @param roomId    房间id
     * @returns {Promise}
     */
    "getMessagesByRoom": function (roomId) {
        var promise = new Promise((resolve, reject) => {
            MessageModel.find({
                "_roomId": roomId
            }, null, {
                "sort": {
                    "createAt": -1
                },
                "limit": 20
            }, (ex, messages) => {
                if (ex) {
                    reject(ex);
                }
                resolve(messages);
            });
        });
        return promise;
    },

    /**
     * 用户发送信息
     * @param message   用户发送的信息
     * @returns {Promise}
     */
    "postNew": function (message) {
        var promise = new Promise((resolve, reject) => {
            var Message = new MessageModel();
            Message.content = message.content;
            Message.creator = message.creator;
            Message.save((ex, message) => {
                if (ex) {
                    reject(ex);
                }
                resolve(message);
            });
        });
        return promise;
    }

};

