/**
 * socket相关事件
 */

"use strict";

const Controller = require("../Controller");
const promisedNode = require("promised-node");

const UserController = promisedNode.load(Controller.User);
const RoomController = promisedNode.load(Controller.Room);
const MessageController = promisedNode.load(Controller.Message);


module.exports = (socket) => {

    /**
     * 新用户加入
     */
    socket.on("user-join", (user) => {});

    /**
     * 获取在线用户
     */
    socket.on("get-online-users", () => {});

    /**
     * 接收到消息
     */
    socket.on("message", (data) => {});

};
