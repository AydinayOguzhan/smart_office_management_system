const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class UserNotificationDal {

    add(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`INSERT INTO public."UserNotifications"("userId", "notificationId", "notificationMail", notification) 
                VALUES (${obj.userId}, ${obj.notificationId}, '${obj.notificationMail}', ${obj.notification});`,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        else resolve(new SuccessResult(Messages.Successful));
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    update(obj){
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`UPDATE public."UserNotifications"
                SET "notificationMail"='${obj.notificationMail}', notification=${obj.notification}
                WHERE id=${obj.id}`,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        else resolve(new SuccessResult(Messages.Successful));
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select * from public."UserNotifications"`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...userNotifications] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, userNotifications));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    getDetailsByUserIdAndNotificationName(userId, notificationName){
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT un.id, "userId", "notificationId", "name", "notificationMail", "notification"
                from public."UserNotifications" as un inner join public."Notifications" as n
                on "notificationId" = n.id
                where "userId" = ${userId} and "name" = '${notificationName}';`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [userNotification] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, userNotification));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    getAllDetailsByUserId(userId){
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT un.id, "userId", "notificationId", "name", "notificationMail", "notification"
                from public."UserNotifications" as un inner join public."Notifications" as n on "notificationId" = n.id
                where "userId" = ${userId};`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...userNotifications] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, userNotifications));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    getMotionNotificationSettingsByUserId(userId){
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT un.id, "userId", "notificationId", "name", "notificationMail", "notification"
                from public."UserNotifications" as un inner join public."Notifications" as n on "notificationId" = n.id
                where "userId" = ${userId} and "name"='Hareket'; `, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [userNotifications] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, userNotifications));
                });
            }, (errorResponse) => { 
                reject(errorResponse);
            });
        });
    }

    getAllMotionNotificationSettings(){
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT un.id, "userId", "notificationId", "name", "notificationMail", "notification"
                from public."UserNotifications" as un inner join public."Notifications" as n on "notificationId" = n.id
                where "name"='Hareket'; `, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...userNotifications] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, userNotifications));
                }); 
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }


    getTemperatureNotificationSettingsByUserId(userId){
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT un.id, "userId", "notificationId", "name", "notificationMail", "notification"
                from public."UserNotifications" as un inner join public."Notifications" as n on "notificationId" = n.id
                where "userId" = ${userId} and "name"='Sıcaklık'; `, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [userNotifications] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, userNotifications));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    getHumidityNotificationSettingsByUserId(userId){
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT un.id, "userId", "notificationId", "name", "notificationMail", "notification"
                from public."UserNotifications" as un inner join public."Notifications" as n on "notificationId" = n.id
                where "userId" = ${userId} and "name"='Nem'; `, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [userNotifications] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, userNotifications));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }
}

module.exports = UserNotificationDal;