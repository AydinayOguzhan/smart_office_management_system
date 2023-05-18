const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");
const { MongoClient} = require("mongodb");
require('dotenv').config()


class RecordDal {
    constructor() {
        this.uri = process.env.MONGODB_URI;
        this.client = new MongoClient(this.uri);
        this.db = this.client.db(process.env.MONGODB_DB_NAME);
        this.recordsCol = this.db.collection(process.env.MONGO_DB_RECORDS_COLLECTION);
    }

    async add(obj) {
        try {
            const result = await this.recordsCol.insertOne(obj);
            return new Promise((resolve, reject) => {
                if (result.insertedId == undefined) {
                    resolve(new ErrorResult(Messages.Unsuccessful));
                }
                resolve(new SuccessResult(Messages.Successful));
            });
        } catch (error) {
            return new ErrorResult(error.message);
        } finally {
            await this.client.close();
        }
    }

    async getAll() {
        try {
            const query = {};
            const cursor = await this.recordsCol.find(query);
            var records = new Array();
            await cursor.forEach(record => records.push(record));
            return new SuccessDataResult(Messages.Successful, records);
        } catch (error) {
            return new ErrorResult(error.message);
        } finally {
            await this.client.close();
        }
    }

    async getDevices() {
        try {
            //get distinct values from db
            const cursor = await this.recordsCol.aggregate([{ $group: { "_id": { device_id: "$device_id", device_name: "$device_name" } } }]);
            var devices = new Array();
            await cursor.forEach(device => devices.push(device));
            return new SuccessDataResult(Messages.Successful, devices);
        } catch (error) {
            return new ErrorResult(error.message);
        } finally {
            await this.client.close();
        }
    }


}

module.exports = RecordDal;