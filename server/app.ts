/// <reference path="../typings/index.d.ts" />

import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
// import * as logger from "morgan";
// import * as cookieParser from "cookie-parser";
import * as session from "express-session";
// import * as bodyParser from "body-parser";
import * as mongoStore from "connect-mongo";

import * as config from "./config";
import * as router from "./routes/index";

// import * as socketIo from "socket.io";
// const socketEvents = require("./Socket");

const MongoStore = mongoStore(session);

// import "./_.mongoose.page";

const app: express.Application = express();
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

export { app }
