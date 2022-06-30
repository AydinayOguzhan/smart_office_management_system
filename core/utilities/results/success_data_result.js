const SuccessResult = require("./success_result");

class SuccessDataResult extends SuccessResult{
    constructor(message,data){
        super();
        super.message = message
        this.data = data
    }
}

module.exports = SuccessDataResult;