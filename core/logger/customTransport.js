var winston = require("winston");
const Transport = require("winston-transport");
const LogService = require("../../business/log_service");
var notifications = require("../../web_socket/notification_socket");

class CustomTransport extends Transport{
    constructor(opts){
        super(opts);
        this.key = opts.key
        this.logService = new LogService();
    }

    async log(info, callback){
        setImmediate(()=>{
            this.emit('logged', info);
        });

        switch (this.key) {
            case "server":
                var result = await this.logService.addServerLog(info);
                // console.log(result);
                // notifications.sendData(info);
                break;
            case "exception":
                var result = await this.logService.addExceptionLog(info);
                // notifications.sendData(info);
                break;
            case "rejection":
                var result = await this.logService.addRejectionLog(info);
                // notifications.sendData(info);
                break;
            default:
                break;
        }


        callback();
    }
}

module.exports = CustomTransport;