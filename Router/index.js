/**
 * ajax路由控制
 */

"use strict";

let Controller = require("../Controller");

const UserController = Controller.User;
const RoomController = Controller.Room;
const MessageController = Controller.Message;

/**
 * 路由控制模块
 */
module.exports = (app, socket) => {

    /**
     * 验证用户是否登录
     */
    app.get("/api/validate", (req, res, next) => {
        let userId = req.session.userId;
        if (!userId) {
            return res.send(401);
        }
        UserController.findUserById(userId)
            .then((user) => {
                return res.send(200, {
                    "msg": "success",
                    "user": user
                });
            })
            .catch((ex) => _errorHandler(res, ex, next));
    });

    /**
     * 登录或注册请求
     */
    app.post("/api/login-register", (req, res, next) => {
        let email = req.query.email;
        UserController.findByEmailOrCreate(email).then((user) => {
            let userId = user._id;
            UserController.online(userId).then((user) => {
                req.session.userId = userId;
                res.send(200, {
                    "user": user
                });
            });
        }).catch((ex) => _errorHandler(res, ex, next));
    });

    /**
     * 用户登出请求
     */
    app.post("/api/logout", (req, res, next) => {
        let userId = req.session.userId;
        UserController.offline(userId)
            .then(() => {
                req.session.userId = null;
                return res.send(200);
            }).catch((ex) => _errorHandler(res, ex, next));
    });

    /**
     * SPA主页
     */
    app.get("/", (req, res) => {
        res.sendfile(__dirname + "public/index.html");
    });
};

/**
 * 错误优先处理
 * @param  {object} res response对象
 * @param  {object} ex  错误对象
 */
function _errorHandler(res, ex, next) {
    if (ex) {
        res.send(500, ex);
        next();
    }
}
