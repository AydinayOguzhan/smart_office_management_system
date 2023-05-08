const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class PasswordChangeCodeDal {

    add(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`INSERT INTO public."PasswordChangeCodes"(user_id, code, timestamp)
                    VALUES (${obj.user_id}, '${obj.code}', ${obj.timestamp});`,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        else resolve(new SuccessResult(Messages.Successful)); 
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    getCodeByUserId(userId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select * from public."PasswordChangeCodes" where user_id = ${userId}`,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        if (result.rowCount <= 0) resolve(new ErrorResult(Messages.UserNotFound));
                        const [code] = result.rows;
                        resolve(new SuccessDataResult(Messages.Successful, code));
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

}

module.exports = PasswordChangeCodeDal;