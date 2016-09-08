"use strict";
var express_1 = require("express");
var jsonwebtoken_1 = require("jsonwebtoken");
var config_1 = require("../config");
var protectedRouter = express_1.Router();
exports.protectedRouter = protectedRouter;
protectedRouter.use(function (request, response, next) {
    var token = request.headers.authorization;
    jsonwebtoken_1.verify(token, config_1.secret, function (tokenError) {
        if (tokenError) {
            return response.status(403).json({
                message: "Invalid token, please Log in first"
            });
        }
        next();
    });
});
protectedRouter.get("/", function (request, response) {
    response.json({
        text: "Greetings, you have valid token.",
        title: "Protected call"
    });
});
//# sourceMappingURL=protected.js.map