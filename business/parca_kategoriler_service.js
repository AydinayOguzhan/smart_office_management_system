const ParcaKategorilerDal = require("../data_access/parca_kategoriler_dal");
const Validator = require("../node_modules/fastest-validator");

class ParcaKategorilerService{
    constructor(){
        this.dal = new ParcaKategorilerDal();

        this.v = new Validator();
        this.schema = {
            adi:{type:"string", optional:false, min:2}
        }
    }

    async getAll(){
        const result = await this.dal.getAll();
        return result;
    }

    async getById(id){
        const result = await this.dal.getById(id);
        return result;
    }

    async add(obj){
        const check = this.v.compile(this.schema);
        var validationResult = check(obj);
        if (Array.isArray(validationResult)) {
            return validationResult;
        }

        const result = await this.dal.add(obj);
        return result;
    }

    async update(obj){
        const check = this.v.compile(this.schema);
        var validationResult = check(obj);
        if (Array.isArray(validationResult)) {
            return validationResult;
        }

        const result = await this.dal.update(obj);
        return result;
    }

    async delete(id){
        const result = await this.dal.delete(id);
        return result;
    }
}

module.exports = ParcaKategorilerService;