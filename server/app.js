/// <reference path="../typings/index.d.ts" />
/// <reference path="../typings/globals/mongoose/index.d.ts" />
/// <reference path="../typings/globals/node/index.d.ts" />
/// <reference path="../typings/globals/express/index.d.ts" />
"use strict";
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");
var mongoStore = require("connect-mongo");
var Config_1 = require("./Config");
var router = require("./routes/index");
var socketIo = require("socket.io");
var index_1 = require("./Socket/index");
var MongoStore = mongoStore(session);
require("./_.mongoose.page");
var app = express();
app.disable("x-powered-by");
app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '../public')));
app.use('/client', express.static(path.join(__dirname, '../client')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    "secret": Config_1.Config.cookieSecret,
    "maxAge": Config_1.Config.maxAge,
    "key": Config_1.Config.db,
    "resave": false,
    "saveUninitialized": false,
    "store": new MongoStore({
        "db": Config_1.Config.db,
        "url": Config_1.Config.database,
        "autoRemove": "disabled"
    })
}));
router.Router(app);
// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(express.static(path.join(__dirname, '../node_modules')));
    app.use(express.static(path.join(__dirname, '../tools')));
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    next(err);
});
// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});
//  开启socket监听
var io = socketIo.listen(app.listen(app.get("port"), function () {
    console.log("app listen on " + app.get("port") + "...");
}));
//  初始化socket相关配置
index_1.socketEvents(io);
//# sourceMappingURL=app.js.map