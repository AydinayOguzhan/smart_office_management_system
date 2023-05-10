const AuthDal = require("../data_access/auth_dal");
const ValidatorAdapter = require("../core/utilities/validatorAdapter/validatorAdapter");
const HashingHelper = require("../core/utilities/security/hashing/hashing_helper");
const SuccessResult = require("../core/utilities/results/success_result");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");
const JwtAdapter = require("../core/utilities/security/jwt/jwt_adapter");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const UserOperationClaimDal = require("../data_access/user_operation_claim_dal");
const MailAdapter = require("../core/utilities/mail/mail_adapter");
const PasswordChangeCodeService = require("./password_change_code_service");
const dateFormat = require("date-and-time");
const { Timestamp } = require("mongodb");

class AuthService {
    constructor() {
        this.dal = new AuthDal();
        this.validatorAdapter = new ValidatorAdapter();
        this.hashingHelper = new HashingHelper();
        this.jwtAdapter = new JwtAdapter();
        this.userOperationClaimDal = new UserOperationClaimDal();
        this.mailAdapter = new MailAdapter();
        this.passwordChangeService = new PasswordChangeCodeService();

        this.saltRounds = 10;

        this.registerSchema = {
            first_name: { type: "string", optional: false },
            last_name: { type: "string", optional: false },
            email: { type: "email", optional: false },
            password: { type: "string", optional: false, min:8 }
        }

        this.loginSchema = {
            email: { type: "email", optional: false },
            password: { type: "string", optional: false }
        }

        this.forgotPasswordSchema = {
            email: {type: "email", optional: false},
        }

        this.checkCodeSchema = {
            email: {type: "email", optional: false},
            code: {type: "string", optional: false},
        }
    }

    async register(obj) {
        const validatorResult = this.validatorAdapter.validate(this.registerSchema, obj);
        if (validatorResult !== true) return validatorResult;

        var checkEmail = await this.checkUserMail(obj.email);
        if(checkEmail === true) return new ErrorResult(Messages.UserAlreadyExist);

        const {salt,hash} = await this.hashingHelper.CreatePasswordHash(obj.password, this.saltRounds);
        let registerObj = { first_name: obj.first_name, last_name: obj.last_name, email: obj.email, password_salt: salt, password_hash: hash};

        const result = await this.dal.register(registerObj);

        const userOperationClaimResult = await this.userOperationClaimDal.add({user_id: result.data, operation_claim_id:2}); // 2 is user
        if(userOperationClaimResult.success === false) return userOperationClaimResult;

        return result;
    }

    async login(obj) {
        const validatorResult = this.validatorAdapter.validate(this.loginSchema, obj);
        if (validatorResult !== true) return validatorResult;

        const userResult = await this.dal.login(obj.email);
        if(userResult.success === false) return userResult;
        const verifyHash = await this.hashingHelper.VerifyPasswordHash(obj.password, userResult.data.password_hash);

        const userOperationClaims = await this.dal.getUserClaimsById(userResult.data.id);
        // console.log(userOperationClaims)
        const {token, expirationDate} = this.jwtAdapter.CreateToken(obj.email,userOperationClaims.data);

        //TODO: verifyHash true ise token üretsin. Eğer verifyHash false ise token üretmesine gerek yok.
        return verifyHash? new SuccessDataResult(Messages.Successful, {token, expirationDate}): new ErrorResult(Messages.Unsuccessful);
    }

    async forgotPassword(obj){
        const validatorResult = this.validatorAdapter.validate(this.forgotPasswordSchema, obj);
        if (validatorResult !== true) return validatorResult;

        const user = await this.dal.getUserByMail(obj.email);
        if(user.success === false) return user;
        
        const result = await this.passwordChangeService.add(user.data.id);
        if(result.success === false) return new ErrorResult(Messages.Unsuccessful);

        this.mailAdapter.sendEmail("Şifre değiştirme isteği hakkında", `Şifrenizi değiştirmek istediğinizi gördük. Lütfen size gönderdiğimiz kodu sitede açılan alana 1 saat içinde giriniz. Aksi taktirde kod geçersiz sayılacaktır. 
Kod: ${result.data.code}`, obj.email);

        return new SuccessResult(Messages.Successful);
    }

    async checkCode(obj){
        const validatorResult = this.validatorAdapter.validate(this.checkCodeSchema, obj);
        if (validatorResult !== true) return validatorResult;

        const user = await this.dal.getUserByMail(obj.email);
        if(user.success === false) return user;

        const passwordCode = await this.passwordChangeService.getCodeByUserId(user.data.id);
        if(passwordCode.success === false) return passwordCode;

        const checkDate = new Date();
        const timestamp = new Date(passwordCode.data.timestamp);

        var hours = Math.abs(timestamp - checkDate) / 36e5;

        if (obj.code !== passwordCode.data.code) return new ErrorResult(Messages.Unsuccessful);
        else if(hours > 1.00) return new ErrorResult(Messages.CodeDateExpired); //1 means 1 hour
        else {this.passwordChangeService.setCodeUseTrueById(passwordCode.data.id); return new SuccessResult(Messages.Successful);}
    }

    async checkUserMail(email){
        var emailUser = await this.dal.getUserByMail(email);
        if(emailUser.success === false) return false;
        else return true;
    }

    async getUserByMail(email){
        var result = await this.dal.getUserByMail(email);
        return result;
    }

}

module.exports = AuthService;