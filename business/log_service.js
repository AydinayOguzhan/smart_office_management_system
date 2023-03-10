// var winLog = require("../core/logger/winston_logger");
const LogDal = require("../data_access/log_dal");
const dateFormat = require("date-and-time");

class LogService{
    constructor(){
        this.dal = new LogDal();
    }

    async getAllServerLogs(){
        var result = await this.dal.getAllServerLogs();
        return result;
    }

    async getAllExceptionLogs(){
        var result = await this.dal.getAllExceptionLogs();
        return result;
    }

    async getAllRejectionLogs(){
        var result = await this.dal.getAllRejectionLogs();
        return result;
    }

    // async getById(id, userId){
    //     const operationResult = await Operations.securedOperations(userId, 1);
    //     if (operationResult.success === false) {
    //         return operationResult;
    //     }
    //     var result = await this.dal.getById(id);
    //     return result;
    // }

    async getServerLogCount()
    {
        var result = await this.dal.getServerLogCount();
        // console.log(`log_sevrice: ${result}`);
        return result;
    }

    async addServerLog(obj){
        var data = {message: obj.message, level: obj.level, timestamp: obj.timestamp};
        var result = await this.dal.addServerLog(data);
        return result;
    }

    async addExceptionLog(obj){
        var data = {message: obj.message, level: obj.level, timestamp: obj.timestamp, error:obj.error};
        var result = await this.dal.addExceptionLog(data);
        return result;
    }

    async addRejectionLog(obj){
        var data = {message: obj.message, level: obj.level, timestamp: obj.timestamp, error:obj.error};
        var result = await this.dal.addRejectionLog(data);
        return result;
    }
}

module.exports = LogService;