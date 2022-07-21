const ErrorResult = require("./error_result");

class ErrorDataResult extends ErrorResult{
    constructor(message, data){
        super();
        super.message = message;
        this.data = data;
    }
}

module.exports = ErrorDataResult;