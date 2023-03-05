const AuthDal = require("../data_access/auth_dal");
const Validator = require("../node_modules/fastest-validator");
const dateFormat = require("date-and-time");
const MyValidator = require("../core/utilities/my_validator/validator");
const HashingHelper = require("../core/utilities/security/hashing/hashing_helper");
const SuccessResult = require("../core/utilities/results/success_result");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class AuthService {
    constructor() {
        this.dal = new AuthDal();
        this.myValidator = new MyValidator();
        this.saltRounds = 10;
        this.hashingHelper = new HashingHelper();

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
        return verifyHash? new SuccessResult(Messages.Successful): new ErrorResult(Messages.Unsuccessful);
    }

}

module.exports = AuthService;