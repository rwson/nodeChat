/**
 * socket相关事件
 */

"use strict";

const Controller = require("../Controller");

const UserController = Controller.User;
const RoomController = Controller.Room;
const MessageController = Controller.Message;

module.exports = (socket) => {

    /**
     * 新用户加入
     */
    socket.on("useJoin", (userId, roomId) => {
        RoomController.joinRoom(userId, roomId)
            .then((users) => {
                socket.emit("Success", {
                    "message": "加入房间成功"
                });
            }).catch((ex) => {
                socket.emit("Error", {
                    "error": ex
                });
            });
    });

    /**
     * 获取在线用户
     */
    socket.on("getOnlineUsers", () => {
        UserController.getOnlineUsers()
            .then((users) => {
                socket.emit("Users", {
                    "users": users
                });
            })
            .catch((ex) => {
                socket.emit("Error", {
                    "error": ex
                });
            });
    });

    /**
     * 接收到消息
     */
    socket.on("Message", (message) => {
        MessageController.postNew(message)
            .then((message) => {
                socket.emit("postSuccess");
            })
            .catch((ex) => {
                socket.emit("Error", {
                    "error": ex
                });
            });
    });

    /**
     * 根据id获取房间里面所有消息
     */
    socket.on("getRoomMessages", (roomId) => {
        MessageController.getMessagesByRoomId(roomId)
            .then((messages) => {
                socket.emit("AllMessages", {
                    "messages": messages
                });
            })
            .catch((ex) => {
                socket.emit("Error", {
                    "error": ex
                });
            });
    });

};
