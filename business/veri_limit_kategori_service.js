const Operations = require("../core/utilities/secured_operations/secured_operations");
const VeriLimitKategoriDal = require("../data_access/veri_limit_kategori_dal");

class VeriLimitKategoriService{
    constructor(){
        this.dal = new VeriLimitKategoriDal();
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
        obj.durum = true;
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
}

module.exports = VeriLimitKategoriService;