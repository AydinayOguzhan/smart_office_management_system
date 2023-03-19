const Validator = require("../node_modules/fastest-validator");
const dateFormat = require("date-and-time");
const ValidatorAdapter = require("../core/utilities/validatorAdapter/validatorAdapter");
const OperationOperationClaimDal = require("../data_access/operation_operation_claim_dal");

class OperationOperationClaimService {
    constructor() {
        this.dal = new OperationOperationClaimDal();
        this.validatorAdapter = new ValidatorAdapter();

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
        const validatorResult = this.validatorAdapter.validate(this.schema, obj);
        if(validatorResult !== true) return validatorResult;

        const result = await this.dal.addOperationOperationClaim(obj);
        return result;
    }
}

module.exports = OperationOperationClaimService;