/**
 * Message
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */
"use strict";
var _1 = require("../Model/");
var MessageModel = _1.Model.Message;
exports.MessageController = {
    /**
     * 根据roomId获取信息(50条)
     * @param roomId    房间id
     * @param type      消息类型
     * @returns {Promise}
     */
    "getMessagesByRoomId": function (roomId, type) {
        var condition = {
            "roomId": roomId
        };
        var promise = new Promise(function (resolve, reject) {
            MessageModel.find(condition, null, {
                "sort": {
                    "createAt": -1
                },
                "limit": 50
            }, function (ex, messages) {
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
        var promise = new Promise(function (resolve, reject) {
            var Message = new MessageModel();
            Message.content = message.content;
            Message.creator = message.creator;
            Message.roomId = message.roomId;
            Message.save(function (ex, message) {
                if (ex) {
                    reject(ex);
                }
                resolve(message);
            });
        });
        return promise;
    }
};
//# sourceMappingURL=Message.js.map