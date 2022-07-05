const VeriLimitDal = require("../data_access/veri_limit_dal");

class VeriLimitService{
    constructor(){
        this.dal = new VeriLimitDal();
    }

    async getAll(){
        var result = await this.dal.getAll();
        return result;
    }

    async getById(id){
        var result = await this.dal.getById(id);
        return result;
    }

    async add(obj){
        obj.durum = true;
        var result = await this.dal.add(obj);
        return result;
    }

    async update(obj){
        var result = await this.dal.update(obj);
        return result;
    }

    async delete(id){
        var result = await this.dal.delete(id);
        return result;
    }
}

module.exports = VeriLimitService;