const ValidatorAdapter = require("../core/utilities/validatorAdapter/validatorAdapter");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");
const PasswordChangeCodeDal = require("../data_access/password_change_code_dal");
const dateFormat = require("date-and-time");
const crypto = require("crypto");
const SuccessDataResult = require("../core/utilities/results/success_data_result");

class PasswordChangeCodeService {
    constructor() {
        this.dal = new PasswordChangeCodeDal();
        this.validatorAdapter = new ValidatorAdapter();

        this.schema = {
            user_id: { type: "number", optional: false },
        }
    }

    async add(userId) {
        let obj = {
            user_id : userId
        };

        const validatorResult = this.validatorAdapter.validate(this.schema, obj);
        if (validatorResult !== true) return validatorResult;

        const date = new Date();
        obj.timestamp = dateFormat.format(date, "YYYY-MM-DD HH:mm:ss");
        obj.code = this.createRandomCode(16);
        
        var result = await this.dal.add(obj);
        if(result.success === false) return result;

        return new SuccessDataResult(Messages.Successful, obj);   
    }

    async getCodeByUserId(userId){
        const result = this.dal.getCodeByUserId(userId);
        return result;
    }

    async setCodeUseTrueById(codeId){
        const result = this.dal.setCodeUseTrueById(codeId);
        return result;
    }

    createRandomCode(length){
        const code = crypto.randomBytes(length).toString("hex");
        return code;
    }
}

module.exports = PasswordChangeCodeService;