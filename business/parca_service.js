const ParcaDal = require("../data_access/parca_dal");
const Operations = require("../core/utilities/secured_operations/secured_operations");

class ParcaService{
    constructor(){
        this.dal = new ParcaDal();
    }

    async getAll(userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAll();
        return result;
    }

    async getAllByWithoutDurum(userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByWithoutDurum();
        return result;
    }

    async getById(id, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getById(id);
        return result;
    }

    async add(obj, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.add(obj);
        return result;
    }

    async update(obj, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.update(obj);
        return result;
    }

    async delete(id, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.delete(id);
        return result;
    }

    async getAllByDurum(durum, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByDurum(durum);
        return result;
    }

    async getAllByDate(startDate,endDate, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByDate(startDate,endDate);
        return result;
    }

    async getAllByCategory(kategoriId, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByCategory(kategoriId);
        return result;
    }

    async getAllByCihaz(cihazId, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByCihaz(cihazId);
        return result;
    }
}

module.exports = ParcaService;