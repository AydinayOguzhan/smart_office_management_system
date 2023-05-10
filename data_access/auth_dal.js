const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class AuthDal {
    // getAllServerLogs() {
    //     return new Promise((resolve, reject) => {
    //         connection.connect((successResponse) => {
    //             connection.query("SELECT * FROM serverlogs", (err, result) => {
    //                 if (err) resolve(new ErrorResult(err));
    //                 if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
    //                 const [...cihazlar] = result.rows;
    //                 resolve(new SuccessDataResult(Messages.Successful, cihazlar));
    //             });
    //         }, (errorResponse) => {
    //             reject(new ErrorResult(errorResponse));
    //         })
    //     });
    // }



    register(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`INSERT INTO public."Users"(
                    first_name, last_name, email, password_salt, password_hash)
                    VALUES ('${obj.first_name}', '${obj.last_name}', '${obj.email}', '${obj.password_salt}', 
                    '${obj.password_hash}') RETURNING id;`,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        else resolve(new SuccessDataResult(Messages.Successful, result.rows[0].id)); //result.rows[0].id returns user id
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    login(email) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select * from public."Users" where email = '${email}' ;`,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        if (result.rowCount <= 0) resolve(new ErrorResult(Messages.UserNotFound));
                        const [user] = result.rows;
                        resolve(new SuccessDataResult(Messages.Successful, user));
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    getUserClaimsById(userId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT uoc.user_id, uoc.operation_claim_id, oc.name 
                FROM public."UserOperationClaims" as uoc inner join public."OperationClaims" as oc on 
                uoc.operation_claim_id = oc.id
                where user_id = ${userId};`,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        if (result.rowCount <= 0) resolve(new ErrorResult(Messages.UserNotFound));
                        const [...user] = result.rows;
                        resolve(new SuccessDataResult(Messages.Successful, user));
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    getUserByMail(email){
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM public."Users" where email = '${email}';`,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        if (result.rowCount <= 0) resolve(new ErrorResult(Messages.UserNotFound));
                        const [user] = result.rows;
                        resolve(new SuccessDataResult(Messages.Successful, user));
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    changePasswordByMail(obj){
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`UPDATE public."Users" set password_salt = '${obj.password_salt}', 
                password_hash = '${obj.password_hash}' where email = '${obj.email}'; `,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        else resolve(new SuccessDataResult(Messages.Successful));
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }
}

module.exports = AuthDal;