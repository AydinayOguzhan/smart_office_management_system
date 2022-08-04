var winston = require("winston");
const UserOperationClaimDal = require("../../data_access/user_operation_claim_dal");
const { combine, timestamp, json, errors } = winston.format;

const logger = winston.createLogger({
    format: combine(errors({ stack: true }), timestamp({
        format: "DD-MM-YYYY hh:mm:ss.SSS A"
    }), json()),
    transports: [
        new winston.transports.File({filename: 'logs/server.log'}),
    ],
    exceptionHandlers: [
        new winston.transports.File({filename:'logs/exception.log'}),
    ],
    rejectionHandlers: [ 
        new winston.transports.File({filename:'logs/rejections.log'}),
    ],
});

module.exports = logger;