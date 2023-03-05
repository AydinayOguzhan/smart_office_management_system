const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
// const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");
const { MongoClient, ObjectId } = require("mongodb");
require('dotenv').config()


class ReadingDal {
    constructor() {
        this.uri = process.env.MONGODB_URI;
        this.client = new MongoClient(this.uri);
        this.db = this.client.db(process.env.MONGODB_DB_NAME);
        this.readingsCol = this.db.collection(process.env.MONGO_DB_READINGS_COLLECTION);
    }

    async addReading(obj) {
        try {
            const result = await this.readingsCol.insertOne(obj);
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

    async getDevices() {
        try {
            //get distinct values from db
            const cursor = await this.readingsCol.aggregate([{ $group: { "_id": { device_id: "$device_id", device_name: "$device_name" } } }]);
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

    async getTemperaturesByDevice(deviceId) {
        try {
            const query = {device_id: Number(deviceId)};
            const projection = {temperature:1, timestamp:1, _id:0}
            const cursor = await this.readingsCol.find(query,{projection});
            var readings = new Array();
            await cursor.forEach(reading => readings.push(reading));
            return new SuccessDataResult(Messages.Successful, readings);
        }catch(error){
            return new ErrorResult(error.message);
        }finally{
            await this.client.close();
        }
    }

    async getHumiditiesByDevice(deviceId) {
        try {
            const query = {device_id: Number(deviceId)};
            const projection = {humidity:1, timestamp:1, _id:0};
            const cursor = await this.readingsCol.find(query, {projection});
            var readings = new Array();
            await cursor.forEach(reading => readings.push(reading));
            return new SuccessDataResult(Messages.Successful, readings);
        }catch(error){
            return new ErrorResult(error.message);
        }finally{
            await this.client.close();
        }
    }

    // async getAll() {
    //     try {
    //         const query = { durum: 1 };

    //         const cursor = await this.olcumlerCol.find(query);

    //         var olcumler = new Array();
    //         await cursor.forEach(olcum => olcumler.push(olcum));

    //         return new SuccessDataResult(Messages.Successful, olcumler);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         await this.client.close();
    //     }
    // }

    // async getAllByWithoutDurum() {
    //     try {
    //         const query = {};

    //         const cursor = await this.olcumlerCol.find(query);

    //         var olcumler = new Array();
    //         await cursor.forEach(olcum => olcumler.push(olcum));

    //         return new SuccessDataResult(Messages.Successful, olcumler);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         await this.client.close();
    //     }
    // }

    // async getById(id) {
    //     try {
    //         const query = { "_id": ObjectId(id) };

    //         const data = await this.olcumlerCol.findOne(query);

    //         return data;

    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         await this.client.close();
    //     }
    // }

    // async add(obj) {
    //     try {
    //         obj.durum = 1;
    //         obj.eklenme_tarihi = new Date().toLocaleDateString();
    //         const result = await this.olcumlerCol.insertOne(obj);

    //         // console.log(result);
    //         return new Promise((resolve, reject) => {
    //             if (result.insertedId == undefined) {
    //                 resolve(new ErrorResult(Messages.Unsuccessful));
    //             }
    //             resolve(new SuccessResult(Messages.Successful));
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         await this.client.close();
    //     }
    // }


    // async delete(id) {
    //     try {
    //         const filter = { "_id": ObjectId(id) };
    //         const options = { upsert: true };
    //         const updateDoc = {
    //             $set: { durum: 0 },
    //         };

    //         var result = await this.olcumlerCol.updateOne(filter, updateDoc, options);

    //         return new Promise((resolve, reject) => {
    //             if (result.matchedCount <= 0) {
    //                 resolve(new ErrorResult(Messages.DataNotFound));
    //             } else if (result.modifiedCount <= 0) {
    //                 resolve(new ErrorResult(Messages.Unsuccessful));
    //             } else {
    //                 resolve(new SuccessResult(Messages.Successful));
    //             }
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         await this.client.close();
    //     }
    // }

    // async getAllByCihazId(cihazId) {
    //     try {
    //         const query = { "cihaz_id": Number(cihazId) };

    //         const cursor = await this.olcumlerCol.find(query);

    //         var olcumler = new Array();
    //         await cursor.forEach(olcum => olcumler.push(olcum));

    //         return new SuccessDataResult(Messages.Successful, olcumler);

    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         await this.client.close();
    //     }
    // }

    // async getAllByIsikSiddetiMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit) {
    //     try {
    //         const query = {
    //             meksis_kod: meksisKod, bina_id: binaId, kampus_id: kampusId,
    //             isik_siddeti: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1
    //         };

    //         const cursor = await this.olcumlerCol.find(query);

    //         var olcumler = new Array();
    //         await cursor.forEach(olcum => olcumler.push(olcum));
    //         // console.log(olcumler)
    //         return new SuccessDataResult(Messages.Successful, olcumler);

    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         await this.client.close();
    //     }
}

module.exports = ReadingDal;