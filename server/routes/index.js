/**
 * index
 * build by rwson @9/9/16
 * mail:rw_Song@sina.com
 */
"use strict";
var path = require("path");
var Controller = require("../Controller");
var Util = require("../Util");
var UserController = Controller.User;
var RoomController = Controller.Room;
var MessageController = Controller.Message;
function Router(app) {
    /**
     * 验证用户是否登录
     */
    app.get("/api/validate", function (req, res, next) {
        var user = req.session.user;
        if (Util.isEmpty(user)) {
            res.status(401)
                .send({
                "status": "error"
            });
            return;
        }
        res.status(200)
            .send({
            "status": "success",
            "user": user
        });
    });
    /**
     * 登录或注册请求
     */
    app.post("/api/login-register/:email", function (req, res, next) {
        var email = req.params.email;
        UserController.findByEmailOrCreate(email).then(function (user) {
            var userId = user._id;
            UserController.online(userId).then(function (user) {
                req.session.user = user;
                res.status(200)
                    .send({
                    "status": "success",
                    "user": user
                });
            });
        })
            .catch(function (ex) {
            return _errorHandler(res, ex, next);
        });
    });
    /**
     * 用户登出请求
     */
    app.post("/api/logout", function (req, res, next) {
        var userId = req.session.user.userId;
        UserController.offline(userId)
            .then(function () {
            req.session.user = null;
            res.status(200)
                .send({
                "status": "success"
            });
        })
            .catch(function (ex) {
            return _errorHandler(res, ex, next);
        });
    });
    /**
     * SPA主页
     */
    app.use(function (req, res) {
        res.sendFile(path.resolve("./public/index.html"));
    });
}
exports.Router = Router;
/**
 * 错误优先处理
 * @param  {object} res     response对象
 * @param  {object} ex      错误对象
 * @param  {function} next  回调
 */
function _errorHandler(res, ex, next) {
    if (ex) {
        res.status(500)
            .send({
            "status": "error"
        });
    }
}
//# sourceMappingURL=index.js.map