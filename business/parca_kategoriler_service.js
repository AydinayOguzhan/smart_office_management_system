const ParcaKategorilerDal = require("../data_access/parca_kategoriler_dal");
const ParcaKategorilerObject = require("../entities/parca_kategoriler_object");
const Operations = require("../core/utilities/secured_operations/secured_operations");

class ParcaKategorilerService{
    constructor(){
        this.dal = new ParcaKategorilerDal();
    }

    async getAll(userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        const result = await this.dal.getAll();
        return result;
    }

    async getById(id, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        const result = await this.dal.getById(id);
        return result;
    }

    async add(obj, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        const result = await this.dal.add(obj);
        return result;
    }

    async update(obj, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        const result = await this.dal.update(obj);
        return result;
    }

    async delete(id, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        const result = await this.dal.delete(id);
        return result;
    }
}

module.exports = ParcaKategorilerService;