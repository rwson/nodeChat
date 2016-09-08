"use strict";
var express_1 = require("express");
var crypto_1 = require("crypto");
var jsonwebtoken_1 = require("jsonwebtoken");
var config_1 = require("../config");
var loginRouter = express_1.Router();
exports.loginRouter = loginRouter;
var user = {
    hashedPassword: "97fe86e10b558f6b0de6b20a4f22fae853bcce13723451999327976a2ca6fa4e7bb554c1cc0f262f8b0caa31ca967761" +
        "a5d283aa140e0b1388dbbcb42d58a07576564eb32cdf9e090820f17b5595a9c50f53b584089cbef4788c088e7fc6181080ec7" +
        "310b08edd3964d1a031aa1730b9d6a5ab91efea70e16350dd92d3f6c69e",
    salt: "joH3RgPYTAgRy/+cBbQGwy26fZE/fmzbmw2/v/DLoJWvF8QAUuzvFFTp9xcvh9BBoxB0E1E6e7bL/Gc4s+aYHCrLwYebXLMx0" +
        "P/VRWTPqvoUe7T1JrzCBdLK5yDvb5Vl2H5oB8hCe/Gb6fLP3/fQM7CKsAQJHJYwq8aj1N7ssjI=",
    username: "john"
};
loginRouter.post("/signup", function (request, response, next) {
    if (!request.body.hasOwnProperty("password")) {
        var err = new Error("No password");
        return next(err);
    }
    var salt = crypto_1.randomBytes(128).toString("base64");
    crypto_1.pbkdf2(request.body.password, salt, 10000, config_1.length, function (err, hash) {
        response.json({
            hashed: hash.toString("hex"),
            salt: salt
        });
    });
});
// login method
loginRouter.post("/", function (request, response, next) {
    crypto_1.pbkdf2(request.body.password, user.salt, 10000, config_1.length, function (err, hash) {
        if (err) {
            console.log(err);
        }
        // check if password is active
        if (hash.toString("hex") === user.hashedPassword) {
            var token = jsonwebtoken_1.sign({ "user": user.username, permissions: [] }, config_1.secret, { expiresIn: "7d" });
            response.json({ "jwt": token });
        }
        else {
            response.json({ message: "Wrong password" });
        }
    });
});
//# sourceMappingURL=login.js.map