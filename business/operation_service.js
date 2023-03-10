const Validator = require("../node_modules/fastest-validator");
const dateFormat = require("date-and-time");
const MyValidator = require("../core/utilities/my_validator/validator");
const OperationDal = require("../data_access/operation_dal");

class OperationService {
    constructor() {
        this.dal = new OperationDal;
        this.myValidator = new MyValidator();

        this.schema = {
            name: { type: "string", optional: false },
        }

    }

    async getall(){
        const result = await this.dal.getAll();
        return result;
    }

    async add(obj){
        const validatorResult = this.myValidator.validate(this.schema, obj);
        if(validatorResult !== true) return validatorResult;

        const result = await this.dal.add(obj);
        return result;
    }
}

module.exports = OperationService;