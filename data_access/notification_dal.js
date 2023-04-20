const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class NotificationDal {

    add(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`INSERT INTO public."Notifications"(name) VALUES ('${obj.name}');`,
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
                connection.query(`select * from public."Notifications"`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...notifications] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, notifications));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }


}

module.exports = NotificationDal;