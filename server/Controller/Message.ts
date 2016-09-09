/**
 * Message
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */

"use strict";

import {Model} from "../Model/";

const MessageModel = Model.Message;

export const MessageController = {

    /**
     * 根据roomId获取信息(50条)
     * @param roomId    房间id
     * @param type      消息类型
     * @returns {Promise}
     */
    "getMessagesByRoomId": (roomId, type) => {
        let condition = {
            "roomId": roomId
        };
        let promise = new Promise((resolve, reject) => {
            MessageModel.find(condition, null, {
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
                }
                resolve(message);
            });
        });
        return promise;
    }

};