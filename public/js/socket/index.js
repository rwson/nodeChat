/**
 * websocket相关事件暴露
 */

"use strict";


const io = socket(SOCKET_ADDRESS);

/**
 * socket连接成功
 */
io.on("connect", () => {
    console.log("socket握手成功!");
});

/**
 * socket发生错误,控制台打印信息
 */
io.on("error occurred", (ex) => {
    console.group("socket error");
    console.log(ex);
    console.groupEnd();
});

io.emit("get room rooms",(data) => {
});

export function getAllRooms(callback) {
    io.emit("get room messages");
}


/**
 * 创建一个房间
 * @param name  房间名称
 */
export function createRoom(name) {
}
