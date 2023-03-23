const dateFormat = require("date-and-time");
const ValidatorAdapter = require("../core/utilities/validatorAdapter/validatorAdapter");
const MotionSensorDal = require("../data_access/motion_sensor_dal");

class MotionSensorService{
    constructor(){
        this.dal = new MotionSensorDal();
        this.validatorAdapter = new ValidatorAdapter();

        this.schema = {
            device_id:{type:"number", optional:false},
            device_name:{type:"string", optional: false}
        }

    }

    async addMotion(...args){
        console.log("service")
        const [,,obj] = args;
        const validatorResult = this.validatorAdapter.validate(this.schema, obj);
        if(validatorResult !== true) return validatorResult;

        let date = new Date();
        obj.timestamp = dateFormat.format(date, "YYYY/MM/DD HH:mm:sse");
        const result = await this.dal.addMotion(obj);
        return result;
    }

    async getMotionDevices(){
        const result = await this.dal.getMotionDevices();
        return result;
    }

    async getAllMotions(){
        const result = await this.dal.getAllMotions();
        return result;
    }

    async getAllMotionsByDevice(...args){
        const [,,deviceId] = args;
        const result = await this.dal.getAllMotionsByDevice(deviceId);
        return result;
    }

}

module.exports = MotionSensorService;