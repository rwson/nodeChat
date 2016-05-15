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
                .catch((ex) => _socketException(socket, ex, "all room's RoomController.getRooms"));

            /**
             *  创建新房间(群聊,任何人都能进)
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
                        .catch((ex) => _socketException(socket, ex, "create room's RoomController.getRooms"));
                })
                    .catch((ex) => _socketException(socket, ex, "create room's RoomController.createRoom"));
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
                    .catch((ex) => _socketException(socket, ex, "get all room's RoomController.getRooms"));
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
                            .catch((ex) => _socketException(socket, ex, "delete room's RoomController.getRooms"));
                    })
                    .catch((ex) => _socketException(socket, ex, "delete room's RoomController.deleteRoom"));
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
                //  房间表新增用户
                RoomController.joinRoom(roomId, userId)
                    .then((room) => {
                        //  用户表修改所在房间id
                        UserController.joinRoom(userId, roomId)
                            .then((user) => {
                                //  重新获取所有信息(用户第一次进入房间,只获取之前的聊天记录,之前其他人的加入信息不管)
                                MessageController.getMessagesByRoomId(data.roomId, "user")
                                    .then((messages) => {
                                        socket.broadcast.emit("messages", {
                                            "messages": messages
                                        });
                                        socket.emit("messages", {
                                            "messages": messages
                                        });
                                    })
                                    .catch((ex) => _socketException(socket, ex, "join room's MessageController.getMessagesByRoomId"));
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
                                    .catch((ex) => _socketException(socket, ex, "UserController.getOnlineUsers"));
                                //  发送系统消息
                                socket.emit("join success", {
                                    "message": "加入房间成功",
                                    "roomName": room.name
                                });
                            })
                            .catch((ex) => _socketException(socket, ex, "join room's UserController.joinRoom"));
                    })
                    .catch((ex) => _socketException(socket, ex, "join room's RoomController.joinRoom"));
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
                    .catch((ex) => _socketException(socket, ex, "get online users' UserController.getOnlineUsers"));
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
                    .catch((ex) => _socketException(socket, ex, "get messages' MessageController.getMessagesByRoomId"));
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
                            .catch((ex) => _socketException(socket, ex, "post message's MessageController.postNew"));
                    })
                    .catch((ex) => _socketException(socket, ex, "post message's MessageController.getMessagesByRoomId"));
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
                            .then((room) => {
                                socket.broadcast.emit("users", {
                                    "users": room.users
                                });
                            })
                            .catch((ex) => _socketException(socket, ex, "leave room's RoomController.postNew"));
                    })
                    .catch((ex) => _socketException(socket, ex, "leave room's UserController.leaveRoom"));
            });

            /**
             * 请求添加好友
             */
            socket.on("request add friend", (data) => {
                const userId = data.userId;
                const targetId = data.targetId;
                //  先把请求写入数据库
                UserController.requestAddFriend(userId, targetId)
                    .then((user) => {

                        console.log(user);

                        //  像前台发送通知,前台根据传过去的targetId是否等于当前用户的id做判断
                        socket.broadcast.emit("new friend request", {
                            "user": user,
                            "targetId": targetId
                        });
                    })
                    .catch((ex) => _socketException(socket, ex, "request add friend's UserController.requestAddFriend"));
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
 * @param info      错误信息
 * @private
 */
function _socketException(socket, ex, info) {
    console.log(ex);
    return socket.emit("error occurred", {
        "error": ex,
        "eventName": info
    });
}
