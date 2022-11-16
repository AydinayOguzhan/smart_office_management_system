const VeriLimitKategoriDal = require("../data_access/veri_limit_kategori_dal");
const Validator = require("../node_modules/fastest-validator");

class VeriLimitKategoriService{
    constructor(){
        this.dal = new VeriLimitKategoriDal();

        this.v = new Validator();
        this.schema = {
            adi:{type:"string", optional:false}
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

module.exports = VeriLimitKategoriService;