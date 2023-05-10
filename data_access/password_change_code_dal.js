const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class PasswordChangeCodeDal {

    add(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`INSERT INTO public."PasswordChangeCodes"(user_id, code, timestamp, is_checked, is_used)
                    VALUES (${obj.user_id}, '${obj.code}', '${obj.timestamp}', false, false);`,
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
                connection.query(`SELECT * FROM public."PasswordChangeCodes"
                where user_id = ${userId} and is_used = false order by "timestamp" desc limit 1;`,
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

    setCodeCheckedTrueById(codeId){
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`UPDATE public."PasswordChangeCodes" set is_checked = true where id = ${codeId}`,
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

    setCodeUseTrueById(codeId){
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`UPDATE public."PasswordChangeCodes" set is_used = true where id = ${codeId}`,
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