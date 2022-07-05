const ParcaKategorilerDal = require("../data_access/parca_kategoriler_dal");
const ParcaKategorilerObject = require("../entities/parca_kategoriler_object");

class ParcaKategorilerService{
    constructor(){
        this.dal = new ParcaKategorilerDal();
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
        const result = await this.dal.add(obj);
        return result;
    }

    async update(obj){
        const result = await this.dal.update(obj);
        return result;
    }

    async delete(id){
        const result = await this.dal.delete(id);
        return result;
    }
}

module.exports = ParcaKategorilerService;