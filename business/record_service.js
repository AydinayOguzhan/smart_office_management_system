const RecordDal = require("../data_access/record_dal");

class RecordService{
    constructor(){
        this.dal = new RecordDal();
    }

    async add(document){
        const result = await this.dal.add(document);
        return result;
    }

    async getAll(){
        const result = await this.dal.getAll();
        return result;
    }
}

module.exports = RecordService;