const dateFormat = require("date-and-time");
const NotificationDal = require("../data_access/notification_dal");

class NotificationService {
    constructor() {
        this.dal = new NotificationDal();
    }

    async add(obj){
        const result = await this.dal.add(obj);
        return result;
    }

    async getAll(){
        const result = await this.dal.getAll();
        return result;
    }

}

module.exports = NotificationService;