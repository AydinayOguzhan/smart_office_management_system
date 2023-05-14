const dateFormat = require("date-and-time");
const UserNotificationDal = require("../data_access/user_notification_dal");
const AuthService = require("./auth_service");

class UserNotificationService {
    constructor() {
        this.dal = new UserNotificationDal();
        this.authService = new AuthService();
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

    async getDetailsByUserIdAndNotificationName(userId, notificationName){
        const result = await this.dal.getDetailsByUserIdAndNotificationName(userId, notificationName);
        return result;
    }

    async getAllDetailsByUserId(userId){
        const result = await this.dal.getAllDetailsByUserId(userId);
        return result;
    }

    async getAllDetailsByEmail(email){
        const user = await this.authService.getUserByMail(email);
        if(user.success === false) return user;

        const result = await this.dal.getAllDetailsByUserId(user.data.id);
        return result;
    }
}

module.exports = UserNotificationService;