const indexDal  = require("../data_access/index_dal")

class IndexService{
    constructor(){
        this.dalInstance = new indexDal()
    }
    
    getAll(){
        return this.dalInstance.getAll();
    }   

    getById(id){
        return this.dalInstance.getById(id);
    }
}

module.exports = IndexService;