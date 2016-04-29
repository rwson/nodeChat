/**
 * 程序入口文件
 */

"use strict";

const express = require("express");
const expressPromise = require("express-promise");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const debug = require("debug")("nodeChat:server");
const socketIo = require("socket.io");
const router = require("./Router");
const config = require("./config");

require("./_.mongoose.page");

const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", port);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    "secret": config.cookieSecret,
    "cookie": {
        "maxAge": config.maxAge
    },
    key: config.db,
    store: require("mongoose-session")(mongoose)
}));
app.use(expressPromise());

//  应用路由模块
router(app);

if (app.get("env") === "development") {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.send(500, {
            message: err.message,
            error: err
        });
    });
}

//  开启socket监听
let io = socketIo.listen(app.listen(app.get("port"), () => {
    console.log("app listen on" + app.get("port") + "...");
}));


io.on("connection", (socket) => {
    socket.emit("news", {hello: "world"});
    socket.on("test event", function (data) {
        console.log(data);
    });
});
