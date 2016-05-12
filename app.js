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
const MongoStore = require('connect-mongo')(session);
const config = require("./config");
const router = require("./Router");
const socketIo = require("socket.io");
const socketEvents = require("./Socket");

//  mongodb支持分页查询
require("./_.mongoose.page");

const app = express();
const port = process.env.PORT || 4000;

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

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
    "maxAge": config.maxAge,
    "key": config.db,
    "resave": false,
    "saveUninitialized": false,
    "store": new MongoStore({
        "db": config.db,
        "url": config.database,
        "autoRemove": "disabled"
    })
}));
app.use(expressPromise());

//  应用路由模块
router(app);

//  开发环境
if (app.get("env") === "development") {
    app.use((err, req, res, next) => {
        res.status(err.status || 500)
            .send(500, {
                message: err.message,
                error: err
            });
    });
}

//  开启socket监听
let io = socketIo.listen(app.listen(app.get("port"), () => {
    console.log("app listen on " + app.get("port") + "...");
}));

//  初始化socket相关配置
socketEvents(io);
