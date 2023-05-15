const dateFormat = require("date-and-time");
const MailAdapter = require("../core/utilities/mail/mail_adapter");
const ValidatorAdapter = require("../core/utilities/validatorAdapter/validatorAdapter");
const MotionSensorDal = require("../data_access/motion_sensor_dal");
const { sendData } = require("../web_socket/notification_socket");
const SuccessResult = require("../core/utilities/results/success_result");
const SecurityAspectHelper = require("../core/utilities/security/securityAspectHelper");
const UserNotificationService = require("./user_notification_service");

class MotionSensorService {
    constructor() {
        this.dal = new MotionSensorDal();
        this.validatorAdapter = new ValidatorAdapter();
        this.mailAdapter = new MailAdapter();
        this.securityAspectHelper = new SecurityAspectHelper();
        this.userNotificationService = new UserNotificationService();

        this.schema = {
            device_id: { type: "number", optional: false },
            device_name: { type: "string", optional: false }
        }

    }

    async addMotion(obj, token) {
        const securityAspectResult = await this.securityAspectHelper.help("addMotion", token);
        if (securityAspectResult.success === false) return securityAspectResult;


        const validatorResult = this.validatorAdapter.validate(this.schema, obj);
        if (validatorResult !== true) return validatorResult;

        let date = new Date();
        obj.timestamp = dateFormat.format(date, "YYYY-MM-DD HH:mm:ss");

        const userMotionNotificationSetting = await this.userNotificationService.getMotionNotificationSettingsByEmail(securityAspectResult.data);

        if(userMotionNotificationSetting !== undefined && userMotionNotificationSetting.data.notification === true){
            const mailResult = await this.mailAdapter.sendEmail("Yeni Hareket uyarısı", `${obj.device_name} isimli cihazda
             ${obj.timestamp} tarihinde yeni bir hareket algılandı`, userMotionNotificationSetting.data.notificationMail);
            if (mailResult.success === false) return mailResult;
        }


        sendData(obj, "motion"); //for sending data to websocket clients

        const result = await this.dal.addMotion(obj);
        return result;
    }

    async getMotionDevices() {
        const result = await this.dal.getMotionDevices();
        return result;
    }

    async getAllMotions() {
        const result = await this.dal.getAllMotions();
        return result;
    }

    async getAllMotionsByDevice(...args) {
        const [, , deviceId] = args;
        const result = await this.dal.getAllMotionsByDevice(deviceId);
        return result;
    }

    async getAllMotionSensorStatistics() {
        const result = await this.dal.getAllMotionSensorStatistics();
        return result;
    }

}

module.exports = MotionSensorService;