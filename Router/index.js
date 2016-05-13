/**
 * ajax路由控制
 */

"use strict";

const path = require("path");
const Controller = require("../Controller");
const Util = require("../Util");

const UserController = Controller.User;
const RoomController = Controller.Room;
const MessageController = Controller.Message;

/**
 * 路由控制模块
 */
module.exports = (app) => {

    /**
     * 验证用户是否登录
     */
    app.get("/api/validate", (req, res, next) => {
        let user = req.session.user;
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
    app.post("/api/login-register/:email", (req, res, next) => {
        let email = req.params.email;
        UserController.findByEmailOrCreate(email).then((user) => {
            let userId = user._id;
            UserController.online(userId).then((user) => {
                req.session.user = user;
                res.status(200)
                    .send({
                        "status": "success",
                        "user": user
                    });
            });
        })
            .catch((ex) => {
                return _errorHandler(res, ex, next);
            });
    });

    /**
     * 用户登出请求
     */
    app.post("/api/logout", (req, res, next) => {
        let userId = req.session.user.userId;
        UserController.offline(userId)
            .then(() => {
                req.session.user = null;
                res.status(200)
                    .send({
                        "status": "success"
                    });
            })
            .catch((ex) => {
                return _errorHandler(res, ex, next);
            });
    });

    /**
     * SPA主页
     */
    app.use((req, res) => {
        res.sendFile(path.resolve("./public/index.html"));
    });
};

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
