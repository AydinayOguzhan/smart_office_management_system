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
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    getAllExceptionLogs() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM exceptionlogs", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    getAllRejectionLogs() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM rejectionlogs", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    // getServerLogCount() {
    //     return new Promise((resolve, reject) => {
    //         connection.connect((successResponse) => {
    //             connection.query("SELECT COUNT(id) as count FROM `serverlogs`", (err, result) => {
    //                 if (err) resolve(new ErrorResult(err));
    //                 if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
    //                 const {...RowDataPacket} = result[0];
    //                 const {count} = RowDataPacket;
    //                 // console.log(`log_dal: ${count}`);
    //                 resolve(new SuccessDataResult(Messages.Successful, count));
    //             });
    //         }, (errorResponse) => {
    //             reject(new ErrorResult(errorResponse));
    //         })
    //     });
    // }

    addServerLog(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`INSERT INTO serverlogs(level, time_stamp, message) 
                VALUES ('${obj.level}','${obj.timestamp}','${obj.message}')`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    else resolve(new SuccessResult(Messages.Successful));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    addExceptionLog(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`INSERT INTO ExceptionLogs(level, time_stamp, message, error) 
                VALUES ('${obj.level}','${obj.timeStamp}','${obj.message}','${obj.error}')`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    else resolve(new SuccessResult(Messages.Successful));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }
    
    addRejectionLog(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`INSERT INTO RejectionLogs(level, time_stamp, message, error) 
                VALUES ('${obj.level}','${obj.timeStamp}','${obj.message}','${obj.error}')`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    else resolve(new SuccessResult(Messages.Successful));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

}

module.exports = LogDal;