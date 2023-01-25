const Validator = require("../node_modules/fastest-validator");
const JwtAdapter = require("../core/utilities/security/jwt/jwt_adapter");
const ErrorResult = require("../core/utilities/results/error_result");
const SuccessResult = require("../core/utilities/results/success_result");

class AuthService {
    constructor() {
        this.jwtAdapter = new JwtAdapter();

        this.v = new Validator();
        this.schema = {
            email: {type:"email", optional:false},
        }
    }

    async login(email){

        //TODO: Hocanın veritabanından yetkileri al ve kişinin yetkisini ekle
        const operationClaims = [{id:3, yetki:"kullanıcı"}];

        let mail = {email: email};
        const check = this.v.compile(this.schema);
        var validationResult = check(mail);
        if (Array.isArray(validationResult)) {
            return validationResult;
        }

        try {
            const token = this.jwtAdapter.CreateToken(email,operationClaims);
            return new SuccessResult(token);
        }catch (e) {
            return new ErrorResult(e);
        }
    }


}

module.exports = AuthService;