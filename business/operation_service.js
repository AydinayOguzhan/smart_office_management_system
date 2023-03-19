const Validator = require("../node_modules/fastest-validator");
const dateFormat = require("date-and-time");
const ValidatorAdapter = require("../core/utilities/validatorAdapter/validatorAdapter");
const OperationDal = require("../data_access/operation_dal");

class OperationService {
    constructor() {
        this.dal = new OperationDal;
        this.validatorAdapter = new ValidatorAdapter();

        this.schema = {
            name: { type: "string", optional: false },
        }

    }

    async getall(){
        const result = await this.dal.getAll();
        return result;
    }

    async add(obj){
        const validatorResult = this.validatorAdapter.validate(this.schema, obj);
        if(validatorResult !== true) return validatorResult;

        const result = await this.dal.add(obj);
        return result;
    }
}

module.exports = OperationService;