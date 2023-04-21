const dateFormat = require("date-and-time");
const UserNotificationDal = require("../data_access/user_notification_dal");

class UserNotificationService {
    constructor() {
        this.dal = new UserNotificationDal();
    }

    async add(obj){
        const result = await this.dal.add(obj);
        return result;
    }

    async update(obj){
        const result = await this.dal.update(obj);
        return result;
    }
    
    async getAll(){
        const result = await this.dal.getAll();
        return result;
    }

}

module.exports = UserNotificationService;