const VeriLimitDal = require("../data_access/veri_limit_dal");
const Operations = require("../core/utilities/secured_operations/secured_operations");
const Validator = require("../node_modules/fastest-validator");

class VeriLimitService{
    constructor(){
        this.dal = new VeriLimitDal();

        this.v = new Validator();
        this.schema = {
            cihazId: {type:"number", integer:true, optional:false},
            kategoriId: {type:"number", integer:true, optional:false},
            adi: {type:"string", optional:false},
            altLimit: {type:"string", optional:false},
            ustLimit: {type:"string", optional:false}
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

    async getAllByCihazId(cihazId){
        var result = await this.dal.getAllByCihazId(cihazId);
        return result;
    }

    async getAllByKategoriId(kategoriId){
        var result = await this.dal.getAllByKategoriId(kategoriId);
        return result;
    }

    async getById(id){
        var result = await this.dal.getById(id);
        return result;
    }

    async add(obj){
        const check = this.v.compile(this.schema);
        var validationResult = check(obj);
        if (Array.isArray(validationResult)) {
            return validationResult;
        }

        var result = await this.dal.add(obj);
        return result;
    }

    async update(obj){
        const check = this.v.compile(this.schema);
        var validationResult = check(obj);
        if (Array.isArray(validationResult)) {
            return validationResult;
        }

        var result = await this.dal.update(obj);
        return result;
    }

    async delete(id){
        var result = await this.dal.delete(id);
        return result;
    }
}

module.exports = VeriLimitService;