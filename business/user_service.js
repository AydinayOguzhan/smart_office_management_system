const Operations = require("../core/utilities/secured_operations/secured_operations");
const UserDal = require("../data_access/user_dal");

class UserService{
    constructor(){
        this.dal = new UserDal();
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

module.exports = UserService;