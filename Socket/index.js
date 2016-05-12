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
     *  添加新房间
     */
    socket.on("create room",(data) => {
        console.log(data);
    });

    /**
     * 新用户加入
     */
    socket.on("use join", (data) => {

        console.log(data);

        let userId = data.userId;
        let roomId = data.roomId;
        RoomController.joinRoom(userId, roomId)
            .then((users) => {
                socket.emit("join success", {
                    "message": "加入房间成功"
                });
            }).catch((ex) => {
                socket.emit("error occurred", {
                    "error": ex
                });
            });
    });

    /**
     * 获取在线用户
     */
    socket.on("get online users", () => {
        UserController.getOnlineUsers()
            .then((users) => {
                socket.emit("users", {
                    "users": users
                });
            })
            .catch((ex) => {
                socket.emit("error occurred", {
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
                socket.emit("post success");
            })
            .catch((ex) => {
                socket.emit("error occurred", {
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
                socket.emit("all messages", {
                    "messages": messages
                });
            })
            .catch((ex) => {
                socket.emit("error occurred", {
                    "error": ex
                });
            });
    });

};
