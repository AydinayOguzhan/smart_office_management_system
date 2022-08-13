const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class UserOperationClaimDal {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM user_operation_claims", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...user_operation_claims] = result;
                    resolve(new SuccessDataResult(Messages.Successful, user_operation_claims));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select * from user_operation_claims where id=${id}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    //array destructuring
                    const [user_operation_claim] = result;
                    resolve(new SuccessDataResult(Messages.Successful, user_operation_claim));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    add(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`INSERT INTO user_operation_claims(user_id, operation_claim_id) 
                VALUES ('${obj.userId}', ${obj.operationClaimId})`, 
                (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result !== undefined) {
                        if (result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
                        else resolve(new ErrorResult(Messages.Unsuccessful));
                    }
                    else resolve(new ErrorResult(Messages.Unsuccessful));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    update(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                console.log(obj);
                connection.query(`UPDATE user_operation_claims set  user_id = '${obj.userId}', operation_claim_id = ${obj.operationClaimId})
                where id  = ${obj.id}`, 
                (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result !== undefined) {
                        if (result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
                        else resolve(new ErrorResult(Messages.Unsuccessful));
                    }
                    else resolve(new ErrorResult(Messages.Unsuccessful));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    getByUserId(userId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select * from user_operation_claims where user_id=${userId}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    //array destructuring
                    const [user_operation_claim] = result;
                    resolve(new SuccessDataResult(Messages.Successful, user_operation_claim));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    // delete(id) {
    //     return new Promise((resolve, reject) => {
    //         connection.connect((successResponse) => {
    //             connection.query(`UPDATE user_operation_claims SET durum=false WHERE id = ${id}`, (err, result) => {
    //                 if (err) resolve(new ErrorResult(err));
    //                 if (result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
    //                 else resolve(new ErrorResult(Messages.Unsuccessful));
    //             });
    //         }, (errorResponse) => {
    //             reject(errorResponse);
    //         });
    //     })
    // }

}

module.exports = UserOperationClaimDal;