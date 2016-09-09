/// <reference path="../typings/index.d.ts" />
"use strict";
var express = require("express");
var path = require("path");
// import * as logger from "morgan";
// import * as cookieParser from "cookie-parser";
var session = require("express-session");
// import * as bodyParser from "body-parser";
var mongoStore = require("connect-mongo");
var router = require("./routes/index");
// import * as socketIo from "socket.io";
// const socketEvents = require("./Socket");
var MongoStore = mongoStore(session);
// import "./_.mongoose.page";
var app = express();
exports.app = app;
app.disable("x-powered-by");
app.use(express.static(path.join(__dirname, '../public')));
app.use('/client', express.static(path.join(__dirname, '../client')));
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
//# sourceMappingURL=app.js.map