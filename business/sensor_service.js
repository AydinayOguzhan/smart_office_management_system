const SensorDal = require("../data_access/sensor_dal");
const Validator = require("fastest-validator");

class SensorService{
    constructor(){
        this.dal = new SensorDal();

        this.v = new Validator();
        this.schema = {
            cihazId: {type:"number", integer:true, optional:false},
            kategoriId: {type:"number", integer:true, optional:false},
            parcaAdi: {type:"string", optional:false}
        }
    }

    async getAll(){
        var result = await this.dal.getAll();
        return result;
    }

    async getAllByWithoutDurum(){
        var result = await this.dal.getAllByWithoutDurum();
        return result;
    }

    async getById(id){
        var result = await this.dal.getById(id);
        return result;
    }

    async add(obj){
        const check = this.v.compile(this.schema);
        var validateResult = check(obj);
        if (Array.isArray(validateResult)) {
            return validateResult;
        }

        var result = await this.dal.add(obj);
        return result;
    }

    async update(obj){
        const check = this.v.compile(this.schema);
        var validateResult = check(obj);
        if (Array.isArray(validateResult)) {
            return validateResult;
        }

        var result = await this.dal.update(obj);
        return result;
    }

    async delete(id){
        var result = await this.dal.delete(id);
        return result;
    }

    async getAllByDurum(durum){
        var result = await this.dal.getAllByDurum(durum);
        return result;
    }

    async getAllByDate(startDate,endDate){
        var result = await this.dal.getAllByDate(startDate,endDate);
        return result;
    }

    async getAllByCategory(kategoriId){
        var result = await this.dal.getAllByCategory(kategoriId);
        return result;
    }

    async getAllByCihaz(cihazId){
        var result = await this.dal.getAllByCihaz(cihazId);
        return result;
    }
}

module.exports = SensorService;