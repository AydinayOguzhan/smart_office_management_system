const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class LogDal {
    getAllServerLogs() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM serverlogs", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getAllExceptionLogs() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM exceptionlogs", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getAllRejectionLogs() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM rejectionlogs", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }
   

    // getById(id) {
    //     return new Promise((resolve, reject) => {
    //         connection.connect((successResponse) => {
    //             connection.query(`select * from cihazlar where id=${id} and durum = 1`, (err, result) => {
    //                 if (err) resolve(new ErrorResult(err));
    //                 if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
    //                 //array destructuring
    //                 const [cihazObj] = result;
    //                 resolve(new SuccessDataResult(Messages.Successful, cihazObj));
    //             });
    //         }, (errorResponse) => {
    //             reject(errorResponse);
    //         });
    //     });
    // }

    getServerLogCount() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT COUNT(id) as count FROM `serverlogs`", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const {...RowDataPacket} = result[0];
                    const {count} = RowDataPacket;
                    // console.log(`log_dal: ${count}`);
                    resolve(new SuccessDataResult(Messages.Successful, count));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    addServerLog(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                // console.log(obj);
                connection.query(`INSERT INTO serverlogs(level, time_stamp, message) 
                VALUES ('${obj.level}','${obj.timestamp}','${obj.message}')`, (err, result) => {

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

    addExceptionLog(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                // console.log(obj);
                connection.query(`INSERT INTO ExceptionLogs(level, time_stamp, message, error) 
                VALUES ('${obj.level}','${obj.timeStamp}','${obj.message}','${obj.error}')`, (err, result) => {

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
    
    addRejectionLog(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                // console.log(obj);
                connection.query(`INSERT INTO RejectionLogs(level, time_stamp, message, error) 
                VALUES ('${obj.level}','${obj.timeStamp}','${obj.message}','${obj.error}')`, (err, result) => {

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

}

module.exports = LogDal;