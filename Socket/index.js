/**
 * socket相关事件
 */

"use strict";

const Controller = require("../Controller");
const Config = require("../config");

const UserController = Controller.User;
const RoomController = Controller.Room;
const MessageController = Controller.Message;

module.exports = (io) => {

    /--------------------------主页的socket----------------------------/
    io.of(Config.socket.main)
        .on("connection", (socket) => {
        });

    /--------------------------房间列表的socket----------------------------/
    io.of(Config.socket.rooms)
        .on("connection", (socket) => {

            //  获取所有房间
            RoomController.getRooms()
                .then((rooms) => {
                    socket.emit("all room", {
                        "rooms": rooms
                    });
                })
                .catch((ex) => _socketException(socket, ex));

            /**
             *  创建新房间
             */
            socket.on("create room", (data) => {
                console.log("创建房间了!");
                //  房间信息保存到数据库
                RoomController.createRoom({
                    "creatorId": data.creatorId,
                    "name": data.name
                }).then((room) => {
                    //  从room表取得所有房间
                    RoomController.getRooms()
                        .then((rooms) => {
                            socket.emit("all room", {
                                "rooms": rooms
                            });
                        })
                        .catch((ex) => _socketException(socket, ex));
                })
                    .catch((ex) => _socketException(socket, ex));
            });

            /**
             * 取得所有房间
             */
            socket.on("get all room", () => {
                //  从room表取得所有房间
                RoomController.getRooms()
                    .then((rooms) => {
                        socket.emit("all room", {
                            "rooms": rooms
                        });
                    })
                    .catch((ex) => _socketException(socket, ex));
            });

            /**
             * 删除一个房间
             */
            socket.on("delete room", (data) => {
                RoomController.deleteRoom(data.id)
                    .then(() => {
                        //  从room表取得所有房间
                        RoomController.getRooms()
                            .then((rooms) => {
                                socket.emit("all room", {
                                    "rooms": rooms
                                });
                            })
                            .catch((ex) => _socketException(socket, ex));
                    })
                    .catch((ex) => _socketException(socket, ex));
            });
        });

    /--------------------------单个房间的socket----------------------------/
    io.of(Config.socket.room)
        .on("connection", (socket) => {

            /**
             * 新用户加入
             */
            socket.on("join room", (data) => {
                let userId = data.userInfo._id;
                let roomId = data.roomId;
                RoomController.joinRoom(roomId, userId)
                    .then((room) => {
                        UserController.joinRoom(userId, roomId)
                            .then(() => {
                                socket.emit("join success", {
                                    "message": "加入房间成功",
                                    "roomName": room.name
                                });
                            })
                            .catch((ex) => _socketException(socket, ex));
                    })
                    .catch((ex) => _socketException(socket, ex));
            });

            /**
             * 获取在线用户
             */
            socket.on("get online users", (data) => {
                let roomId = data.roomId;
                UserController.getOnlineUsers(roomId)
                    .then((users) => {
                        socket.emit("users", {
                            "users": users
                        });
                    })
                    .catch((ex) => _socketException(socket, ex));
            });

            /**
             * 获取所有信息
             */
            socket.on("get messages", (data) => {
                console.log(`好!开始获取${data.roomId}房间里的消息`);
                MessageController.getMessagesByRoomId(data.roomId)
                    .then((messages) => {
                        //console.log(messages);
                        socket.emit("messages", {
                            "messages": messages
                        })
                    })
                    .catch((ex) => _socketException(socket, ex));
            });

            /**
             * 接收到消息
             */
            socket.on("post message", (data) => {
                MessageController.postNew(data)
                    .then(() => {
                        console.log("消息发送入库成功!");
                        socket.broadcast.emit("get messages", {
                            "roomId": data.roomId
                        });
                    })
                    .catch((ex) => _socketException(socket, ex));
            });
        });

    /--------------------------特定用户的socket请求----------------------------/
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
