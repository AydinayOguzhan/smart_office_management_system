const jwt = require("jsonwebtoken");
const ErrorResult = require("../../results/error_result");
const dateFormat = require("date-and-time");
require('dotenv').config();


class JwtAdapter {

    CreateToken(email, operationClaims) {
        let token = jwt.sign({user: email, operationClaims}, process.env.JWT_SECRET_KEY, {expiresIn: "600000"});
        let expirationDate = dateFormat.addMilliseconds(new Date(), 600000);
        expirationDate = dateFormat.format(expirationDate, "YYYY-MM-DD HH:mm:ss");
        return {token, expirationDate};
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