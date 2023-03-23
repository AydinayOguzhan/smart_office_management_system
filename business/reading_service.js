const ReadingDal = require("../data_access/reading_dal");
const dateFormat = require("date-and-time");
const ValidatorAdapter = require("../core/utilities/validatorAdapter/validatorAdapter");

class ReadingService{
    constructor(){
        this.dal = new ReadingDal();
        this.validatorAdapter = new ValidatorAdapter();

        this.schema = {
            device_id:{type:"number", optional:false},
            device_name:{type:"string", optional: false}
        }

    }

    async addReading(...args){
        const [,,obj] = args;
        console.log(obj)
        const validatorResult = this.validatorAdapter.validate(this.schema, obj);
        if(validatorResult !== true) return validatorResult;

        let date = new Date();
        obj.timestamp = dateFormat.format(date, "YYYY/MM/DD HH:mm:sse");
        const result = await this.dal.addReading(obj);
        return result;
    }

    async getDevices(){
        const result = await this.dal.getDevices();
        return result;
    }

    async getTemperaturesByDevice(...args){
        const [,,deviceId] = args;
        console.log(deviceId)
        const result = await this.dal.getTemperaturesByDevice(deviceId);
        return result;
    }

    async getHumiditiesByDevice(...args){
        const [,,deviceId] = args;
        console.log(deviceId)
        const result = await this.dal.getHumiditiesByDevice(deviceId);
        return result;
    }

}

module.exports = ReadingService;