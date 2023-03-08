const jwt = require("jsonwebtoken");
const ErrorResult = require("../../results/error_result");

class JwtAdapter {
    //TODO: Secret key oluştur

    CreateToken(email, operationClaims) {
        let token = jwt.sign({user: email, operationClaims}, "mysecretkey", {expiresIn: "600000"});
        return token;
    }

    VerifyToken(token) {
        try {
            return jwt.verify(token, "mysecretkey");
        } catch (e) {
            return new ErrorResult(e);
        }
    }
}

module.exports = JwtAdapter;