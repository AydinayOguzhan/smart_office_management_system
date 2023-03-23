const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
// const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");
const { MongoClient, ObjectId } = require("mongodb");
require('dotenv').config()


class MotionSensorDal {
    constructor() {
        this.uri = process.env.MONGODB_URI;
        this.client = new MongoClient(this.uri);
        this.db = this.client.db(process.env.MONGODB_DB_NAME);
        this.motionsCol = this.db.collection(process.env.MONGO_DB_MOTIONS_COLLECTION);
    }

    async addMotion(obj) {
        try {
            const result = await this.motionsCol.insertOne(obj);
            return new Promise((resolve, reject) => {
                if (result.insertedId == undefined) {
                    resolve(new ErrorResult(Messages.Unsuccessful));
                }
                resolve(new SuccessResult(Messages.Successful));
            });
        } catch (error) {
            // console.log(error);
            return new ErrorResult(error.message);
        } finally {
            await this.client.close();
        }
    }

    async getMotionDevices() {
        try {
            //get distinct values from db
            const cursor = await this.motionsCol.aggregate([{ $group: { "_id": { device_id: "$device_id", device_name: "$device_name" } } }]);
            var devices = new Array();
            await cursor.forEach(device => devices.push(device));
            return new SuccessDataResult(Messages.Successful, devices);
        } catch (error) {
            // console.log(error);
            return new ErrorResult(error.message);
        } finally {
            await this.client.close();
        }
    }

    async getAllMotions() {
        try {
            const query = {};
            const cursor = await this.motionsCol.find(query);
            var readings = new Array();
            await cursor.forEach(reading => readings.push(reading));
            return new SuccessDataResult(Messages.Successful, readings);
        }catch(error){
            return new ErrorResult(error.message);
        }finally{
            await this.client.close();
        }
    }

    async getAllMotionsByDevice(deviceId) {
        try {
            const query = {device_id: Number(deviceId)};
            const cursor = await this.motionsCol.find(query);
            var readings = new Array();
            await cursor.forEach(reading => readings.push(reading));
            return new SuccessDataResult(Messages.Successful, readings);
        }catch(error){
            return new ErrorResult(error.message);
        }finally{
            await this.client.close();
        }
    }

}

module.exports = MotionSensorDal;