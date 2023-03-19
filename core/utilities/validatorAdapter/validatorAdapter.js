const Validator = require("fastest-validator");

class ValidatorAdapter{
    constructor(){
        this.v = new Validator();
    }
    
    validate(schema, validateObj){
        const check = this.v.compile(schema);
        const validatorResult = check(validateObj);
        if (Array.isArray(validatorResult)) {
            return validatorResult;
        }
        return true;
    }
}

module.exports = ValidatorAdapter;