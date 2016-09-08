"use strict";
/// <reference path="../typings/index.d.ts" />
var express = require("express");
var path_1 = require("path");
var favicon = require("serve-favicon");
var body_parser_1 = require("body-parser");
var login_1 = require("./routes/login");
var protected_1 = require("./routes/protected");
var app = express();
exports.app = app;
app.disable("x-powered-by");
app.use(favicon(path_1.join(__dirname, "../public", "favicon.ico")));
app.use(express.static(path_1.join(__dirname, '../public')));
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
// api routes
app.use("/api", protected_1.protectedRouter);
app.use("/login", login_1.loginRouter);
app.use('/client', express.static(path_1.join(__dirname, '../client')));
// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(express.static(path_1.join(__dirname, '../node_modules')));
    app.use(express.static(path_1.join(__dirname, '../tools')));
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