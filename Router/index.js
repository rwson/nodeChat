/**
 * ajax路由控制
 */

"use strict";

const Controller = require("../Controller");
const path = require("path");

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

        res.status(401)
            .send({
                "status": "error"
            })
            .end();
        //try {
        //    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        //    //console.log(req.session.userId);
        //    let user = req.session.user;
        //    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        //    if (!user) {
        //        return res.status(401)
        //            .send({
        //                "status": "error"
        //            })
        //            .end();
        //    }
        //
        //    res.status(200)
        //        .send({
        //            "status": "success",
        //            "user": user
        //        })
        //        .end();
        //
        //    //UserController.findUserById(userId)
        //    //    .then((user) => {
        //    //        return res.status(200)
        //    //            .send({
        //    //                "status": "success",
        //    //                "user": user
        //    //            })
        //    //            .end();
        //    //    })
        //    //    .catch((ex) => {
        //    //        return _errorHandler(res, ex, next);
        //    //    });
        //} catch (e) {
        //    console.log("查询用户出错!");
        //    console.log("出错啦!");
        //}
    });

    /**
     * 登录或注册请求
     */
    app.post("/api/login-register/:email", (req, res, next) => {
        let email = req.params.email;
        UserController.findByEmailOrCreate(email).then((user) => {
            let userId = user._id;
            UserController.online(userId).then((user) => {
                req.session.userId = user;
                res.status(200)
                    .send({
                        "status": "success",
                        "user": user
                    })
                    .end();
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
        let userId = req.session.userId;
        UserController.offline(userId)
            .then(() => {
                req.session.userId = null;
                res.status(200)
                    .send({
                        "status": "success"
                    })
                    .end();
            })
            .catch((ex) => {
                return _errorHandler(res, ex, next);
            });
    });

    /**
     * SPA主页
     */
    app.use((req, res) => {
        res.sendfile(path.resolve("./public/index.html"));
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
            .send(500, Object.assign({}, ex, {
                "status": "error"
            }))
            .end();
    }
}
