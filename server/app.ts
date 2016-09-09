/// <reference path="../typings/index.d.ts" />
/// <reference path="../typings/globals/mongoose/index.d.ts" />
/// <reference path="../typings/globals/node/index.d.ts" />
/// <reference path="../typings/globals/express/index.d.ts" />

import * as express from "express";
import * as path from "path";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as mongoStore from "connect-mongo";

import {Config} from "./Config";
import * as router from "./routes/index";

import * as socketIo from "socket.io";
import {socketEvents} from "./Socket/index";

const MongoStore = mongoStore(session);

import "./_.mongoose.page";

const app: express.Application = express();
app.disable("x-powered-by");

app.set("port",process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '../public')));
app.use('/client', express.static(path.join(__dirname, '../client')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    "secret": Config.cookieSecret,
    "maxAge": Config.maxAge,
    "key": Config.db,
    "resave": false,
    "saveUninitialized": false,
    "store": new MongoStore({
        "db": Config.db,
        "url": Config.database,
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

    app.use(function(err, req: express.Request, res: express.Response, next: express.NextFunction) {
        res.status(err.status || 500);
        res.json({
            error: err,
            message: err.message
        });
    });
}

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next) {
    let err = new Error("Not Found");
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message
    });
});

//  开启socket监听
let io = socketIo.listen(app.listen(app.get("port"), () => {
    console.log("app listen on " + app.get("port") + "...");
}));

//  初始化socket相关配置
socketEvents(io);

