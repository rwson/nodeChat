/**
 * socket相关事件
 */

"use strict";

const Controller = require("../Controller");
const Config = require("../config");

const UserController = Controller.User;
const RoomController = Controller.Room;
const MessageController = Controller.Message;

module.exports = (io, socket) => {

    //  主页的socket
    io.of(Config.socket.main)
        .on("connection", (socket) => {

        });

    //  房间列表的socket
    io.of(Config.socket.rooms)
        .on("connection", (socket) => {
            /**
             *  创建新房间
             */
            socket.on("create room", (data) => {
                console.log(data);
            });
        });

    //  单个房间的socket
    io.of(Config.socket.room)
        .on("connection", (socket) => {

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
                    }).catch((ex) => _socketException(socket, ex));
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
                    .catch((ex) => _socketException(socket, ex));
            });

            /**
             * 接收到消息
             */
            socket.on("post message", (message) => {
                MessageController.postNew(message)
                    .then((message) => {
                        socket.emit("post success");
                    })
                    .catch((ex) => _socketException(socket, ex));
            });

            /**
             * 获取所有房间
             */
            socket.on("get all rooms", () => {
                RoomController.getRooms()
                    .then((rooms) => {
                        socket.emit("room list", {
                            "rooms": rooms
                        });
                    })
                    .catch((ex) => _socketException(socket, ex));
            });

        });

    //  用户的socket请求
    io.of(Config.socket.my)
        .on("connection", (socket) => {

        });

};

/**
 * socket异常统一处理
 * @param socket    socket实例
 * @param ex        异常对象
 * @private
 */
function _socketException(socket, ex) {
    socket.emit("error occurred", {
        "error": ex
    });
}
