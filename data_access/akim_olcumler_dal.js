const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");
const { MongoClient, ObjectId } = require("mongodb");
require('dotenv').config()

class AkimOlcumlerDal {
    constructor() {
        this.uri = process.env.MONGODB_URI;
        this.client = new MongoClient(this.uri);
        this.db = this.client.db(process.env.MONGODB_DB_NAME);
        this.akimOlcumlerCol = this.db.collection(process.env.MONGODB_AKIM_OLCUMLER_COLLECTION);
    }

    async getAll() {
        try {
            const query = { durum: 1 };

            const cursor = await this.akimOlcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));

            return new SuccessDataResult(Messages.Successful, olcumler);
        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }

    async getAllByWithoutDurum() {
        try {
            const query = {};

            const cursor = await this.akimOlcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));

            return new SuccessDataResult(Messages.Successful, olcumler);
        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }

    async getById(id) {
        try {
            const query = { "_id": ObjectId(id) };

            const data = await this.akimOlcumlerCol.findOne(query);

            return data;

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }

    async add(obj) {
        try {
            obj.durum = 1;
            obj.eklenme_tarihi = new Date().toLocaleDateString();
            const result = await this.akimOlcumlerCol.insertOne(obj);

            // console.log(result);
            return new Promise((resolve, reject) => {
                if (result.insertedId == undefined) {
                    resolve(new ErrorResult(Messages.Unsuccessful));
                }
                resolve(new SuccessResult(Messages.Successful));
            });
        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }


    async delete(id) {
        try {
            const filter = { "_id": ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: { durum: 0 },
            };

            var result = await this.akimOlcumlerCol.updateOne(filter, updateDoc, options);

            return new Promise((resolve, reject) => {
                if (result.matchedCount <= 0) {
                    resolve(new ErrorResult(Messages.DataNotFound));
                } else if (result.modifiedCount <= 0) {
                    resolve(new ErrorResult(Messages.Unsuccessful));
                } else {
                    resolve(new SuccessResult(Messages.Successful));
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }

    async getAllByCihazId(cihazId) {
        try {
            const query = { "cihaz_id": Number(cihazId) };

            const cursor = await this.akimOlcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));

            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }

    async getAllBySicaklik(loverLimit, upperLimit) {
        try {
            const query = { sicaklik: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1 };

            const cursor = await this.akimOlcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));
            // console.log(olcumler)
            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }

    async getAllBySicaklikMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit) {
        try {
            // console.log(meksisKod, binaId, kampusId, loverLimit, upperLimit);

            const query = {
                meksis_kod: meksisKod, bina_id: binaId, kampus_id: kampusId,
                sicaklik: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1
            };

            const cursor = await this.akimOlcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));
            // console.log(olcumler)
            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }

    async getAllByNem(loverLimit, upperLimit) {
        try {
            const query = { nem: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1 };

            const cursor = await this.akimOlcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));
            console.log(olcumler)
            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }

    async getAllByNemMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit) {
        try {
            const query = {
                meksis_kod: meksisKod, bina_id: binaId, kampus_id: kampusId,
                nem: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1
            };

            const cursor = await this.akimOlcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));
            console.log(olcumler)
            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }

    async getAllByAkim(loverLimit, upperLimit) {
        try {
            const query = { akim: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1 };

            const cursor = await this.akimOlcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));
            // console.log(olcumler)
            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }

    async getAllByAkimMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit) {
        try {
            const query = {
                meksis_kod: meksisKod, bina_id: binaId, kampus_id: kampusId,
                akim: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1
            };

            const cursor = await this.akimOlcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));
            console.log(olcumler)
            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }

    async getAllByGurultuMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit) {
        try {
            const query = {meksis_kod:meksisKod, bina_id:binaId, kampus_id:kampusId, 
                gurultu: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1 };

            const cursor = await this.akimOlcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));
            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }

    async getAllByMeksis(args) {
        try {
            // console.log(args)
            var cursor = await this.akimOlcumlerCol.find(args);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));
            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
    }
}

module.exports = AkimOlcumlerDal;