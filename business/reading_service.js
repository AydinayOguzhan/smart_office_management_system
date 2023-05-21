const ReadingDal = require("../data_access/reading_dal");
const dateFormat = require("date-and-time");
const ValidatorAdapter = require("../core/utilities/validatorAdapter/validatorAdapter");
const { randomInt } = require("crypto");
const SecurityAspectHelper = require("../core/utilities/security/securityAspectHelper");
const { sendData } = require("../web_socket/notification_socket");
const UserNotificationService = require("./user_notification_service");
const MailAdapter = require("../core/utilities/mail/mail_adapter");

class ReadingService {
    constructor() {
        this.dal = new ReadingDal();
        this.validatorAdapter = new ValidatorAdapter();
        this.securityAspectHelper = new SecurityAspectHelper();
        this.mailAdapter = new MailAdapter();
        this.userNotificationService = new UserNotificationService();

        this.schema = {
            device_id: { type: "number", optional: false },
            device_name: { type: "string", optional: false }
        }

    }

    randDate() {
        let date = new Date();
        let day = randomInt(0, 15);
        date.setDate(date.getDate() - day)
        return dateFormat.format(date, "YYYY-MM-DD HH:mm:ss");
    }

    async addReading(obj, token) {
        const securityAspectResult = await this.securityAspectHelper.help("addReading", token);
        if (securityAspectResult.success === false) return securityAspectResult;

        const validatorResult = this.validatorAdapter.validate(this.schema, obj);
        if (validatorResult !== true) return validatorResult;

        let date = new Date();
        obj.timestamp = dateFormat.format(date, "YYYY-MM-DD HH:mm:ss");
        // obj.timestamp = this.randDate();

        // const userTemperatureNotificationSetting = await this.userNotificationService.getTemperatureNotificationSettingsByEmail(securityAspectResult.data);
        // const userHumidityNotificationSetting = await this.userNotificationService.getHumidityNotificationSettingsByEmail(securityAspectResult.data);
        const userTemperatureNotificationSettings = await this.userNotificationService.getAllTemperatureNotificationSettings();
        const userHumidityNotificationSettings = await this.userNotificationService.getAllHumidityNotificationSettings();        

        if (obj.temperature >= 40 || obj.temperature <= -2) {
            let notificationObj = { device_id: obj.device_id, device_name: obj.device_name, reading: obj.temperature };
            sendData(notificationObj, "temperature");

            for (let i = 0; i < userTemperatureNotificationSettings.data.length; i++) {
                const element = userTemperatureNotificationSettings.data[i];

                if (element !== undefined && element.notification === true) {
                    const mailResult = await this.mailAdapter.sendEmail("Sıcaklık Problemi Algılandı", `${obj.device_name} isimli cihazda
    ${obj.timestamp} tarihinde ölçülen sıcaklık değeri ${obj.temperature} derecesine ulaşmıştır.`, element.notificationMail);
                    if (mailResult.success === false) return mailResult;
                }
            }
        }
        if (obj.humidity >= 55 || obj.humidity <= 25) {
            let notificationObj = { device_id: obj.device_id, device_name: obj.device_name, reading: obj.humidity };
            sendData(notificationObj, "humidity");

            for (let i = 0; i < userHumidityNotificationSettings.data.length; i++) {
                const element = userHumidityNotificationSettings.data[i];

                if (element !== undefined && element.notification === true) {
                    const mailResult = await this.mailAdapter.sendEmail("Nem Problemi Algılandı", `${obj.device_name} isimli cihazda
    ${obj.timestamp} tarihinde ölçülen nem değeri %${obj.temperature} miktarına ulaşmıştır.`, element.notificationMail);
                    if (mailResult.success === false) return mailResult;
                }   
            }
        }

        const result = await this.dal.addReading(obj);
        return result;
    }

    async getDevices() {
        const result = await this.dal.getDevices();
        return result;
    }

    async getTemperaturesByDevice(deviceId) {
        const result = await this.dal.getTemperaturesByDevice(deviceId);
        return result;
    }

    async getHumiditiesByDevice(deviceId) {
        const result = await this.dal.getHumiditiesByDevice(deviceId);
        return result;
    }

}

module.exports = ReadingService;