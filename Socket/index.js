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
                let userName = data.userInfo.name;
                let roomId = data.roomId;
                //  房间表新增用户
                RoomController.joinRoom(roomId, userId)
                    .then((room) => {
                        //  用户表修改所在房间id
                        UserController.joinRoom(userId, roomId)
                            .then(() => {
                                socket.emit("join success", {
                                    "message": "加入房间成功",
                                    "roomName": room.name
                                });
                                //  发送系统消息
                                RoomController.postNew({
                                    "content": `用户${userName}加入了房间`,
                                    "messageType": "system",
                                    "creator": {},
                                    "roomId": roomId
                                })
                                    .then(() => {
                                        //  重新获取所有信息
                                        MessageController.getMessagesByRoomId(data.roomId)
                                            .then((messages) => {
                                                socket.broadcast.emit("messages", {
                                                    "messages": messages
                                                });
                                                socket.emit("messages", {
                                                    "messages": messages
                                                });
                                            })
                                            .catch((ex) => _socketException(socket, ex));
                                    })
                                    .catch((ex) => _socketException(socket, ex));
                                //  获取房间内所有用户
                                UserController.getOnlineUsers(roomId)
                                    .then((users) => {
                                        socket.broadcast.emit("users", {
                                            "users": users
                                        });
                                        socket.emit("users", {
                                            "users": users
                                        });
                                    })
                                    .catch((ex) => _socketException(socket, ex));

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
                //  从user表中获取当前房间中在线的用户
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
                //  获取所有消息,用户刚进入房间的时候需要
                MessageController.getMessagesByRoomId(data.roomId)
                    .then((messages) => {
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
                //  将接收到的消息保存到message表
                MessageController.postNew(data)
                    .then(() => {
                        //  从messages表中获取数据,并且通知所有用户和自己
                        MessageController.getMessagesByRoomId(data.roomId)
                            .then((messages) => {
                                socket.broadcast.emit("messages", {
                                    "messages": messages
                                });
                                socket.emit("messages", {
                                    "messages": messages
                                });
                            })
                            .catch((ex) => _socketException(socket, ex));
                    })
                    .catch((ex) => _socketException(socket, ex));
            });

            /**
             * 用户离开房间事件
             */
            socket.on("leave room", (data) => {
                let userId = data.userId;
                let roomId = data.roomId;
                UserController.leaveRoom(userId)
                    .then((user) => {
                        RoomController.leaveRoom(roomId, userId)
                            .then(() => {
                                //  离开消息保存到数据库
                                RoomController.postNew({
                                    "content": `用户${user.name}加入了房间`,
                                    "messageType": "system",
                                    "creator": {},
                                    "roomId": roomId
                                }).then(() => {
                                    //  重新获取所有信息
                                    MessageController.getMessagesByRoomId(data.roomId)
                                        .then((messages) => {
                                            //  这边用户已经离开房间,所有就不需要再通知自己了,只需要通知房间内用户
                                            socket.broadcast.emit("messages", {
                                                "messages": messages
                                            });
                                        })
                                        .catch((ex) => _socketException(socket, ex));
                                })
                                    .catch((ex) => _socketException(socket, ex));
                            })
                            .catch((ex) => _socketException(socket, ex));
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
    console.log("exception");
    return socket.emit("error occurred", {
        "error": ex
    });
}
