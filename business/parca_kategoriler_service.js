const ParcaKategorilerDal = require("../data_access/parca_kategoriler_dal");
const parcaKategorilerDal = require("../data_access/parca_kategoriler_dal");
const ParcaKategorilerObject = require("../entities/parca_kategoriler_object");

class ParcaKategorilerService{
    constructor(){
        this.dalInstance = new ParcaKategorilerDal();
    }

    async getAll(){
        const result = await this.dalInstance.getAll();
        return result;
    }

    async getById(id){
        return await this.dalInstance.getById(id);
    }

    add(obj){
        return this.dalInstance.add(obj);
    }

    update(obj){
        return this.dalInstance.update(obj);
    }

    delete(id){
        return this.dalInstance.delete(id);
    }
}

module.exports = ParcaKategorilerService;