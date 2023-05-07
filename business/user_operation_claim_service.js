const AuthDal = require("../data_access/auth_dal");
const ValidatorAdapter = require("../core/utilities/validatorAdapter/validatorAdapter");
const HashingHelper = require("../core/utilities/security/hashing/hashing_helper");
const SuccessResult = require("../core/utilities/results/success_result");
const Messages = require("../core/utilities/constants/messages");
const UserOperationClaimDal = require("../data_access/user_operation_claim_dal");
// const dateFormat = require("date-and-time");

class UserOperationClaimService {
    constructor() {
        this.dal = new UserOperationClaimDal();
        this.validatorAdapter = new ValidatorAdapter();
        

        this.addSchema = {
            user_id: { type: "number", optional: false },
            operation_claim_id: { type: "number", optional: false }
        }
    }

    async add(obj) {
        const validatorResult = this.validatorAdapter.validate(this.addSchema, obj);
        if (validatorResult !== true) return validatorResult;

        const result = this.dal.add(obj);
        return result;
    }

}

module.exports = UserOperationClaimService;