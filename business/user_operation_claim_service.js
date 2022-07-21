const Operations = require("../core/utilities/secured_operations/secured_operations");
const UserOperationClaimDal = require("../data_access/user_operation_claim_dal");

class UserOperationClaimService{
    constructor(){
        this.dal = new UserOperationClaimDal();
    }

    async getAll(){
        // const operationResult = await Operations.securedOperations(1, 2);
        // if (operationResult.success === false) {
        //     return operationResult;
        // }
        var result = await this.dal.getAll();
        return result;
    }

    async getById(id){
        var result = await this.dal.getById(id);
        return result;
    }

    async add(obj){
        // obj.durum = true;
        var result = await this.dal.add(obj);
        return result;
    }

    async update(obj){
        var result = await this.dal.update(obj);
        return result;
    }

    async getByUserId(userId){
        var result = await this.dal.getByUserId(userId);
        return result;
    }

    // async delete(id){
    //     var result = await this.dal.delete(id);
    //     return result;
    // }
    
}

module.exports = UserOperationClaimService;