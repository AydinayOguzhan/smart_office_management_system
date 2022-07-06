const ParcaDal = require("../data_access/parca_dal");

class ParcaService{
    constructor(){
        this.dal = new ParcaDal();
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

    async getAllByDate(startDate,endDate){
        var result = await this.dal.getAllByDate(startDate,endDate);
        return result;
    }

    async getAllByCategory(kategoriId){
        var result = await this.dal.getAllByCategory(kategoriId);
        return result;
    }
}

module.exports = ParcaService;