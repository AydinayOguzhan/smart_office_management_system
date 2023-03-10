const Validator = require("../node_modules/fastest-validator");
const dateFormat = require("date-and-time");
const MyValidator = require("../core/utilities/my_validator/validator");
const OperationOperationClaimDal = require("../data_access/operation_operation_claim_dal");

class OperationOperationClaimService {
    constructor() {
        this.dal = new OperationOperationClaimDal();
        this.myValidator = new MyValidator();

        this.schema = {
            operation_id: { type: "number", optional: false },
            operation_claim_id: { type: "number", optional: false }
        }

    }

    async getall(){
        const result = await this.dal.getall();
        return result;
    }

    async getAllDetails() {
        const result = await this.dal.getAllDetails();
        return result;
    }


    async getOperationOperationClaimsByName(operationName) {
        const result = await this.dal.getOperationOperationClaimsByName(operationName);
        return result;
    }

    async addOperationOperationClaim(obj){
        const validatorResult = this.myValidator.validate(this.schema, obj);
        if(validatorResult !== true) return validatorResult;

        const result = await this.dal.addOperationOperationClaim(obj);
        return result;
    }
}

module.exports = OperationOperationClaimService;