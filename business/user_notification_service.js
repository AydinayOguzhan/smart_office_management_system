const dateFormat = require("date-and-time");
const UserNotificationDal = require("../data_access/user_notification_dal");
const NotificationService = require("./notification_service");
const SuccessResult = require("../core/utilities/results/success_result");
const Messages = require("../core/utilities/constants/messages");
const UserService = require("./user_service");

class UserNotificationService {
    constructor() {
        this.dal = new UserNotificationDal();
        this.notificationService = new NotificationService();
        this.userService = new UserService();
    }

    async add(obj){
        const result = await this.dal.add(obj);
        return result;
    }

    async addDefaultUserNotificationOptions(userId, email){
        const notifications = await this.notificationService.getAll();

        for (let i = 0; i < notifications.data.length; i++) {
            const element = notifications.data[i];
            let optionObj = {userId:userId, notificationMail:email, notificationId:element.id, notification:true};
            let result = this.dal.add(optionObj);
            if(result.success === false) return result;
        }

        return new SuccessResult(Messages.Successful);
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
        const user = await this.userService.getUserByMail(email);
        if(user.success === false) return user;

        const result = await this.dal.getAllDetailsByUserId(user.data.id);
        return result;
    }

    async getMotionNotificationSettingsByEmail(email){
        const user = await this.userService.getUserByMail(email);
        if(user.success === false) return user;

        const result = await this.dal.getMotionNotificationSettingsByUserId(user.data.id);
        return result;
    }

    async getAllMotionNotificationSettings(){
        const result = await this.dal.getAllMotionNotificationSettings();
        return result;
    }

    async getTemperatureNotificationSettingsByEmail(email){
        const user = await this.userService.getUserByMail(email);
        if(user.success === false) return user;

        const result = await this.dal.getTemperatureNotificationSettingsByUserId(user.data.id);
        return result;
    }

    async getAllTemperatureNotificationSettings(){
        const result = await this.dal.getAllTemperatureNotificationSettings();
        return result;
    }

    async getHumidityNotificationSettingsByEmail(email){
        const user = await this.userService.getUserByMail(email);
        if(user.success === false) return user;

        const result = await this.dal.getHumidityNotificationSettingsByUserId(user.data.id);
        return result;
    }

    async getAllHumidityNotificationSettings(){
        const result = await this.dal.getAllHumidityNotificationSettings();
        return result;
    }
}

module.exports = UserNotificationService;