class ErrorResult{
    constructor(message){
        this.success = false;
        this.message = message;
    }
}

module.exports = ErrorResult;