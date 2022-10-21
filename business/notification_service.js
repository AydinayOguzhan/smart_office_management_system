// const Operations = require("../core/utilities/secured_operations/secured_operations");
const dateFormat = require("date-and-time");
const LogService = require("./log_service");

class NotificationService {
    constructor() {
        this.logService = new LogService();
    }

    async getServerLogCount(userId=1) {
        var count = await this.logService.getServerLogCount();
        return count;
    } 

}

module.exports = NotificationService;