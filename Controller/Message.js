/**
 * 消息表控制器
 */

"use strict";

const Model = require("../Model");
const MessageModel = Model.Message;

module.exports = {

    /**
     * 根据roomId获取信息(50条)
     * @param roomId    房间id
     * @returns {Promise}
     */
    "getMessagesByRoomId": (roomId) => {
        let promise = new Promise((resolve, reject) => {
            MessageModel.find({
                "roomId": roomId
            }, null, {
                "sort": {
                    "createAt": -1
                },
                "limit": 50
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
    "postNew": (message) => {
        let promise = new Promise((resolve, reject) => {
            let Message = new MessageModel();
            Message.content = message.content;
            Message.creator = message.creator;
            Message.roomId = message.roomId;
            Message.save((ex, message) => {
                if (ex) {
                    reject(ex);
                } else {
                    resolve(message);
                }
            });
        });
        return promise;
    }

};

