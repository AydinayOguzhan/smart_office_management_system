const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");
const OlcumObject = require("../entities/olcum_object");

class OlcumDal {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM olcumler", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...olcumler] = result;
                    resolve(new SuccessDataResult(Messages.Successful, olcumler));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select * from olcumler where id=${id}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [olcumObj] = result;
                    resolve(new SuccessDataResult(Messages.Successful, olcumObj));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    add(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                console.log(obj);
                connection.query(`INSERT INTO olcumler(cihaz_id, isik_siddeti, sicaklik, karbondioksit_miktari, nem, gurultu, 
                    eklenme_tarihi, durum) VALUES (${obj.cihaz_id}, '${obj.isik_siddeti}', '${obj.sicaklik}', '${obj.karbondioksit_miktari}', 
                    '${obj.nem}', '${obj.gurultu}', '${obj.eklenmeTarihi}', ${obj.durum})`, (err, result) => {

                    if (err) resolve(new ErrorResult(err));
                    if (result !== undefined) {
                        if (result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
                        else resolve(new ErrorResult(Messages.Unsuccessful));
                    }
                    else resolve(new ErrorResult(Messages.Unsuccessful));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    update(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`UPDATE olcumler SET cihaz_id=${obj.cihaz_id} , isik_siddeti='${obj.isik_siddeti}', 
                sicaklik='${obj.sicaklik}', karbondioksit_miktari = '${obj.karbondioksit_miktari}', nem = '${obj.nem}', 
                gurultu = '${obj.gurultu}', eklenme_tarihi = '${obj.eklenmeTarihi}' 
                WHERE id=${obj.id}`, (err, result) => {

                    if (err) resolve(new ErrorResult(err));
                    if (result !== undefined) {
                        if (result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
                        else resolve(new ErrorResult(Messages.Unsuccessful));
                    }
                    else resolve(new ErrorResult(Messages.Unsuccessful));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`UPDATE olcumler SET durum=false WHERE id = ${id}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result !== undefined) {
                        if (result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
                        else resolve(new ErrorResult(Messages.Unsuccessful));
                    }
                    else resolve(new ErrorResult(Messages.Unsuccessful));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        })
    }

    getAllByDurum(durum) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select * from olcumler where durum=${durum}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...olcumler] = result;
                    resolve(new SuccessDataResult(Messages.Successful, olcumler));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    getAllByCihazId(cihazId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select * from olcumler where cihaz_id=${cihazId}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...olcumler] = result;
                    resolve(new SuccessDataResult(Messages.Successful, olcumler));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    getAllByIsikSiddeti(loverLimit, upperLimit) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM olcumler WHERE (isik_siddeti BETWEEN '${loverLimit}' AND '${upperLimit}')`, 
                (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...olcumler] = result;
                    resolve(new SuccessDataResult(Messages.Successful, olcumler));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    getAllBySicaklik(loverLimit, upperLimit) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM olcumler WHERE (sicaklik BETWEEN '${loverLimit}' AND '${upperLimit}')`, 
                (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...olcumler] = result;
                    resolve(new SuccessDataResult(Messages.Successful, olcumler));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    getAllByKarbondioksitMiktari(loverLimit, upperLimit) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM olcumler WHERE (karbondioksit_miktari BETWEEN '${loverLimit}' AND '${upperLimit}')`, 
                (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...olcumler] = result;
                    resolve(new SuccessDataResult(Messages.Successful, olcumler));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    getAllByNem(loverLimit, upperLimit) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM olcumler WHERE (nem BETWEEN '${loverLimit}' AND '${upperLimit}')`, 
                (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...olcumler] = result;
                    resolve(new SuccessDataResult(Messages.Successful, olcumler));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    getAllByGurultu(loverLimit, upperLimit) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM olcumler WHERE (gurultu BETWEEN ${loverLimit} AND ${upperLimit})`, 
                (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    console.log(result);
                    const [...olcumler] = result;
                    resolve(new SuccessDataResult(Messages.Successful, olcumler));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }
}

module.exports = OlcumDal;