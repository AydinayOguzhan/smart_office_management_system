const dateFormat = require("date-and-time");
const LogService = require("./log_service");

class NotificationService {
    constructor() {
        this.logService = new LogService();
    }

    async getServerLogCount() {
        var count = await this.logService.getServerLogCount();
        return count;
    } 

}

module.exports = NotificationService;