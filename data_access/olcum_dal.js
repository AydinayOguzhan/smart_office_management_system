const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");
const { MongoClient, ObjectId } = require("mongodb");
const { options } = require("../app");


class OlcumDal {
    constructor() {
        this.uri = "mongodb://127.0.0.1:27017";
        this.client = new MongoClient(this.uri);
        this.db = this.client.db("deu");
        this.olcumlerCol = this.db.collection("olcumler");
    }

    async getAll() {
        try {
            const query = { durum: 1 };

            const cursor = await this.olcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));

            return new SuccessDataResult(Messages.Successful, olcumler);
        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }

        // return new Promise((resolve, reject) => {
        // connection.connect((successResponse) => {
        //     connection.query("SELECT * FROM olcumler where durum = 1", (err, result) => {
        //         if (err) resolve(new ErrorResult(err));
        //         if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
        //         const [...olcumler] = result;
        //         resolve(new SuccessDataResult(Messages.Successful, olcumler));
        //     });
        // }, (errorResponse) => {
        //     reject(errorResponse);
        // })
        // });
    }

    async getAllByWithoutDurum() {
        try {
            const query = {};

            const cursor = await this.olcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));

            return new SuccessDataResult(Messages.Successful, olcumler);
        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
        // return new Promise((resolve, reject) => {
        //     connection.connect((successResponse) => {
        //         connection.query("SELECT * FROM olcumler", (err, result) => {
        //             if (err) resolve(new ErrorResult(err));
        //             if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
        //             const [...olcumler] = result;
        //             resolve(new SuccessDataResult(Messages.Successful, olcumler));
        //         });
        //     }, (errorResponse) => {
        //         reject(errorResponse);
        //     })
        // });
    }

    async getById(id) {
        try {
            const query = { "_id": ObjectId(id) };

            const data = await this.olcumlerCol.findOne(query);

            return data;

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }

        // return new Promise((resolve, reject) => {
        //     connection.connect((successResponse) => {
        //         connection.query(`select * from olcumler where id=${id} and durum = 1`, (err, result) => {
        //             if (err) resolve(new ErrorResult(err));
        //             if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
        //             const [olcumObj] = result;
        //             resolve(new SuccessDataResult(Messages.Successful, olcumObj));
        //         });
        //     }, (errorResponse) => {
        //         reject(errorResponse);
        //     });
        // });
    }

    async add(obj) {
        try {
            obj.durum = 1;
            obj.eklenme_tarihi = new Date().toLocaleDateString();
            const result = await this.olcumlerCol.insertOne(obj);

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

        // return new Promise((resolve, reject) => {
        //     connection.connect((successResponse) => {
        //         // console.log(obj);
        //         connection.query(`INSERT INTO olcumler(cihaz_id, isik_siddeti, sicaklik, karbondioksit_miktari, nem, gurultu) 
        //         VALUES (${obj.cihaz_id}, '${obj.isik_siddeti}', '${obj.sicaklik}', '${obj.karbondioksit_miktari}', 
        //             '${obj.nem}', '${obj.gurultu}')`, (err, result) => {

        //             if (err) resolve(new ErrorResult(err));
        //             if (result !== undefined) {
        //                 if (result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
        //                 else resolve(new ErrorResult(Messages.Unsuccessful));
        //             }
        //             else resolve(new ErrorResult(Messages.Unsuccessful));
        //         });
        //     }, (errorResponse) => {
        //         reject(errorResponse);
        //     });
        // });
    }


    async delete(id) {
        try {
            const filter = { "_id": ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: { durum: 0 },
            };

            var result = await this.olcumlerCol.updateOne(filter, updateDoc, options);

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

        // return new Promise((resolve, reject) => {
        //     connection.connect((successResponse) => {
        //         connection.query(`UPDATE olcumler SET durum=false WHERE id = ${id}`, (err, result) => {
        //             if (err) resolve(new ErrorResult(err));
        //             if (result !== undefined) {
        //                 if (result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
        //                 else resolve(new ErrorResult(Messages.Unsuccessful));
        //             }
        //             else resolve(new ErrorResult(Messages.Unsuccessful));
        //         });
        //     }, (errorResponse) => {
        //         reject(errorResponse);
        //     });
        // })
    }

    async getAllByCihazId(cihazId) {
        try {
            const query = { "cihaz_id": Number(cihazId) };

            const cursor = await this.olcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));

            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }

        // return new Promise((resolve, reject) => {
        //     connection.connect((successResponse) => {
        //         connection.query(`select * from olcumler where cihaz_id=${cihazId} and durum = 1`, (err, result) => {
        //             if (err) resolve(new ErrorResult(err));
        //             if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
        //             const [...olcumler] = result;
        //             resolve(new SuccessDataResult(Messages.Successful, olcumler));
        //         });
        //     }, (errorResponse) => {
        //         reject(errorResponse);
        //     });
        // });
    }

    async getAllByIsikSiddeti(loverLimit, upperLimit) {
        try {
            const query = { isik_siddeti: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1 };

            const cursor = await this.olcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));
            // console.log(olcumler)
            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
        // return new Promise((resolve, reject) => {
        //     connection.connect((successResponse) => {
        //         connection.query(`SELECT * FROM olcumler WHERE (isik_siddeti BETWEEN '${loverLimit}' AND '${upperLimit}' and durum = 1)`,
        //             (err, result) => {
        //                 if (err) resolve(new ErrorResult(err));
        //                 if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
        //                 const [...olcumler] = result;
        //                 resolve(new SuccessDataResult(Messages.Successful, olcumler));
        //             });
        //     }, (errorResponse) => {
        //         reject(errorResponse);
        //     });
        // });
    }

    async getAllByIsikSiddetiMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit) {
        try {
            const query = {
                meksis_kod: meksisKod, bina_id: binaId, kampus_id: kampusId,
                isik_siddeti: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1
            };

            const cursor = await this.olcumlerCol.find(query);

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

    async getAllBySicaklik(loverLimit, upperLimit) {
        try {
            const query = { sicaklik: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1 };

            const cursor = await this.olcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));
            // console.log(olcumler)
            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
        // return new Promise((resolve, reject) => {
        //     connection.connect((successResponse) => {
        //         connection.query(`SELECT * FROM olcumler WHERE (sicaklik BETWEEN '${loverLimit}' AND '${upperLimit}' and durum = 1)`,
        //             (err, result) => {
        //                 if (err) resolve(new ErrorResult(err));
        //                 if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
        //                 const [...olcumler] = result;
        //                 resolve(new SuccessDataResult(Messages.Successful, olcumler));
        //             });
        //     }, (errorResponse) => {
        //         reject(errorResponse);
        //     });
        // });
    }

    async getAllBySicaklikMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit) {
        try {
            // console.log(meksisKod, binaId, kampusId, loverLimit, upperLimit);

            const query = {
                meksis_kod: meksisKod, bina_id: binaId, kampus_id: kampusId,
                sicaklik: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1
            };

            const cursor = await this.olcumlerCol.find(query);

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

    async getAllByKarbondioksitMiktari(loverLimit, upperLimit) {
        try {
            const query = { karbondioksit_miktari: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1 };

            const cursor = await this.olcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));
            console.log(olcumler)
            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
        // return new Promise((resolve, reject) => {
        //     connection.connect((successResponse) => {
        //         connection.query(`SELECT * FROM olcumler WHERE (karbondioksit_miktari BETWEEN '${loverLimit}' AND '${upperLimit}' and durum = 1)`,
        //             (err, result) => {
        //                 if (err) resolve(new ErrorResult(err));
        //                 if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
        //                 const [...olcumler] = result;
        //                 resolve(new SuccessDataResult(Messages.Successful, olcumler));
        //             });
        //     }, (errorResponse) => {
        //         reject(errorResponse);
        //     });
        // });
    }

    async getAllByKarbondioksitMiktariMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit) {
        try {
            // console.log(meksisKod, binaId, kampusId, loverLimit, upperLimit);
            const query = {
                meksis_kod: meksisKod, bina_id: binaId, kampus_id: kampusId,
                karbondioksit_miktari: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1
            };

            const cursor = await this.olcumlerCol.find(query);

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

    async getAllByNem(loverLimit, upperLimit) {
        try {
            const query = { nem: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1 };

            const cursor = await this.olcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));
            console.log(olcumler)
            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
        // return new Promise((resolve, reject) => {
        //     connection.connect((successResponse) => {
        //         connection.query(`SELECT * FROM olcumler WHERE (nem BETWEEN '${loverLimit}' AND '${upperLimit}' and durum = 1)`,
        //             (err, result) => {
        //                 if (err) resolve(new ErrorResult(err));
        //                 if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
        //                 const [...olcumler] = result;
        //                 resolve(new SuccessDataResult(Messages.Successful, olcumler));
        //             });
        //     }, (errorResponse) => {
        //         reject(errorResponse);
        //     });
        // });
    }

    async getAllByNemMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit) {
        try {
            const query = {
                meksis_kod: meksisKod, bina_id: binaId, kampus_id: kampusId,
                nem: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1
            };

            const cursor = await this.olcumlerCol.find(query);

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

    async getAllByGurultu(loverLimit, upperLimit) {
        try {
            const query = { gurultu: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1 };

            const cursor = await this.olcumlerCol.find(query);

            var olcumler = new Array();
            await cursor.forEach(olcum => olcumler.push(olcum));
            return new SuccessDataResult(Messages.Successful, olcumler);

        } catch (error) {
            console.log(error);
        } finally {
            await this.client.close();
        }
        // return new Promise((resolve, reject) => {
        //     connection.connect((successResponse) => {
        //         connection.query(`SELECT * FROM olcumler WHERE (gurultu BETWEEN ${loverLimit} AND ${upperLimit} and durum = 1)`,
        //             (err, result) => {
        //                 if (err) resolve(new ErrorResult(err));
        //                 if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
        //                 console.log(result);
        //                 const [...olcumler] = result;
        //                 resolve(new SuccessDataResult(Messages.Successful, olcumler));
        //             });
        //     }, (errorResponse) => {
        //         reject(errorResponse);
        //     });
        // });
    }

    async getAllByGurultuMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit) {
        try {
            const query = {meksis_kod:meksisKod, bina_id:binaId, kampus_id:kampusId, 
                gurultu: { $gt: Number(loverLimit), $lt: Number(upperLimit) }, durum: 1 };

            const cursor = await this.olcumlerCol.find(query);

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
            var cursor = await this.olcumlerCol.find(args);

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

module.exports = OlcumDal;