const RecordDal = require("../data_access/record_dal");
const dateFormat = require("date-and-time");

class RecordService{
    constructor(){
        this.dal = new RecordDal();
    }

    async add(document){
        document.timestamp = new Date(document.justName);
        const result = await this.dal.add(document);
        return result;
    }

    async getAll(){
        const result = await this.dal.getAll();
        for (let i = 0; i < result.data.length; i++) {
            const element = result.data[i];
            element.timestamp = dateFormat.format(element.timestamp, "YYYY-M-DD HH:mm:ss")
        }
        return result;
    }

    async getLastTwoDays(){
        const result = await this.dal.getLastTwoDays();
        for (let i = 0; i < result.data.length; i++) {
            const element = result.data[i];
            element.timestamp = dateFormat.format(element.timestamp, "YYYY-M-DD HH:mm:ss")
        }
        return result;
    }

    async getAllDateRange(start_date, end_date){
        const result = await this.dal.getAllDateRange(start_date, end_date);
        for (let i = 0; i < result.data.length; i++) {
            const element = result.data[i];
            element.timestamp = dateFormat.format(element.timestamp, "YYYY-M-DD HH:mm:ss")
        }
        
        return result;
    }
}

module.exports = RecordService;