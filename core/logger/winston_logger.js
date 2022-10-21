var winston = require("winston");
const UserOperationClaimDal = require("../../data_access/user_operation_claim_dal");
const { combine, timestamp, json, errors } = winston.format;
const CustomTransport = require("./customTransport");

// var customTransport = new CustomTransport({});



const logger = winston.createLogger({
    format: combine(errors({ stack: true }), timestamp({
        format: "YYYY-MM-DD hh:mm:ss"
    }), json()),
    transports: [
        new winston.transports.File({filename: 'logs/server.log'}),
        new CustomTransport({key:"server"}),
    ],
    exceptionHandlers: [
        new winston.transports.File({filename:'logs/exception.log'}),
        new CustomTransport("exception"),
    ],
    rejectionHandlers: [ 
        new winston.transports.File({filename:'logs/rejections.log'}),
        new CustomTransport("rejection"),
    ],
});



module.exports = logger;