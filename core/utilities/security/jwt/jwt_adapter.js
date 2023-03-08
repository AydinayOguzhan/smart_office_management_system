const jwt = require("jsonwebtoken");
const ErrorResult = require("../../results/error_result");
require('dotenv').config()


class JwtAdapter {

    CreateToken(email, operationClaims) {
        let token = jwt.sign({user: email, operationClaims}, process.env.JWT_SECRET_KEY, {expiresIn: "600000"});
        return token;
    }

    VerifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (e) {
            return new ErrorResult(e);
        }
    }
}

module.exports = JwtAdapter;