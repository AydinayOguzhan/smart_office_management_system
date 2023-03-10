const AuthDal = require("../data_access/auth_dal");
const MyValidator = require("../core/utilities/my_validator/validator");
const HashingHelper = require("../core/utilities/security/hashing/hashing_helper");
const SuccessResult = require("../core/utilities/results/success_result");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");
const JwtAdapter = require("../core/utilities/security/jwt/jwt_adapter");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
// const dateFormat = require("date-and-time");

class AuthService {
    constructor() {
        this.dal = new AuthDal();
        this.myValidator = new MyValidator();
        this.hashingHelper = new HashingHelper();
        this.jwtAdapter = new JwtAdapter();
        
        this.saltRounds = 10;

        this.registerSchema = {
            first_name: { type: "string", optional: false },
            last_name: { type: "string", optional: false },
            email: { type: "email", optional: false },
            password: { type: "string", optional: false }
        }

        this.loginSchema = {
            email: { type: "email", optional: false },
            password: { type: "string", optional: false }
        }
    }

    async register(obj) {
        const validatorResult = this.myValidator.validate(this.registerSchema, obj);
        if (validatorResult !== true) return validatorResult;

        const {salt,hash} = await this.hashingHelper.CreatePasswordHash(obj.password, this.saltRounds);
        let registerObj = { first_name: obj.first_name, last_name: obj.last_name, email: obj.email, password_salt: salt, password_hash: hash};

        const result = await this.dal.register(registerObj);
        return result;
    }

    async login(obj) {
        const validatorResult = this.myValidator.validate(this.loginSchema, obj);
        if (validatorResult !== true) return validatorResult;

        const userResult = await this.dal.login(obj.email);
        if(userResult.success === false) return userResult;
        const verifyHash = await this.hashingHelper.VerifyPasswordHash(obj.password, userResult.data.password_hash);

        const userOperationClaims = await this.dal.getUserClaimsById(userResult.data.id);
        console.log(userOperationClaims)
        const token = this.jwtAdapter.CreateToken(obj.email,userOperationClaims.data);

        //TODO: verifyHash true ise token üretsin. Eğer verifyHash false ise token üretmesine gerek yok.
        return verifyHash? new SuccessDataResult(Messages.Successful, token): new ErrorResult(Messages.Unsuccessful);
    }


}

module.exports = AuthService;