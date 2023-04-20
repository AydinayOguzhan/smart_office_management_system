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


}

module.exports = UserNotificationDal;