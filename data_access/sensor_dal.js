const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("./connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class SensorDal {
    async getAll() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM sensorler where durum = 1", (err, result) => {
                    // console.log(result);
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...sensorlerObj] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, sensorlerObj));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    async getAllByWithoutDurum() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM sensorler", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...sensorlerObj] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, sensorlerObj));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    async getById(id) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM sensorler where id=${id} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [sensorObj] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, sensorObj));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    async add(obj) {
        return new Promise((resolve,reject)=>{
            connection.connect((successResponse)=>{
                connection.query(`INSERT INTO sensorler(cihaz_id, kategori_id, parca_adi, eklenme_tarihi, durum) 
                VALUES (${obj.cihazId}, ${obj.kategoriId}, '${obj.parcaAdi}', '${obj.eklenme_tarihi}', 1)`, (err,result)=>{
                    if (err) resolve(new ErrorResult(err));
                    else resolve(new SuccessResult(Messages.Successful));
                });
            },(errorResponse)=>{
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    async update(obj) {
        return new Promise((resolve,reject)=>{
            connection.connect((successResponse)=>{
                connection.query(`UPDATE sensorler SET cihaz_id=${obj.cihazId}, kategori_id=${obj.kategoriId},
                parca_adi='${obj.parcaAdi}', eklenme_tarihi='${obj.eklenmeTarihi}', durum=${obj.durum} WHERE id = ${obj.id}`, 
                (err,result)=>{
                    if (err) resolve(new ErrorResult(err));
                    else resolve(new SuccessResult(Messages.Successful));
                });
            },(errorResponse)=>{
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    async delete(id) {
        return new Promise((resolve,reject)=>{
            connection.connect((successResponse)=>{
                connection.query(`UPDATE sensorler SET durum=0 WHERE id = ${id}`, 
                (err,result)=>{
                    if (err) resolve(new ErrorResult(err));
                    else resolve(new SuccessResult(Messages.Successful));
                });
            },(errorResponse)=>{
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    async getAllByDurum(durum) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM sensorler where durum = ${durum} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...sensorlerObj] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, sensorlerObj));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    async getAllByDate(startDate, endDate) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                console.log(startDate);
                console.log(endDate);
                connection.query(`SELECT * FROM sensorler WHERE (eklenme_tarihi BETWEEN '${startDate}' AND '${endDate}' and durum = 1)`, 
                (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...sensorlerObj] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, sensorlerObj));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    async getAllByCategory(kategoriId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM sensorler WHERE kategori_id = ${kategoriId} and durum = 1`, 
                (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...sensorlerObj] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, sensorlerObj));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }


    async getAllByCihaz(cihazId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM sensorler WHERE cihaz_id = ${cihazId} and durum = 1`, 
                (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...sensorlerObj] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, sensorlerObj));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }
}

module.exports = SensorDal;