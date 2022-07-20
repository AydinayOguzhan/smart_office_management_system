const OlcumDal = require("../data_access/olcum_dal");

class OlcumService{
    constructor(){
        this.dal = new OlcumDal();
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

    async getAllByDurum(durum){
        var result = await this.dal.getAllByDurum(durum);
        return result;
    }

    async getAllByCihazId(cihazId){
        var result = await this.dal.getAllByCihazId(cihazId);
        return result;
    }

    async getAllByIsikSiddeti(loverLimit, upperLimit){
        var result = await this.dal.getAllByIsikSiddeti(loverLimit, upperLimit);
        return result;
    }

    async getAllBySicaklik(loverLimit, upperLimit){
        var result = await this.dal.getAllBySicaklik(loverLimit, upperLimit);
        return result;
    }

    async getAllByKarbondioksitMiktari(loverLimit, upperLimit){
        var result = await this.dal.getAllByKarbondioksitMiktari(loverLimit, upperLimit);
        return result;
    }

    async getAllByNem(loverLimit, upperLimit){
        var result = await this.dal.getAllByNem(loverLimit, upperLimit);
        return result;
    }

    async getAllByGurultu(loverLimit, upperLimit){
        var result = await this.dal.getAllByGurultu(loverLimit, upperLimit);
        return result;
    }

}

module.exports = OlcumService;