const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class CihazlarDal {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM cihazlar where durum = 1", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getAllByWithoutDurum() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM cihazlar", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select * from cihazlar where id=${id} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    //array destructuring
                    const [cihazObj] = result;
                    resolve(new SuccessDataResult(Messages.Successful, cihazObj));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        });
    }

    add(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                // console.log(obj);
                connection.query(`INSERT INTO cihazlar(adi, kat, mekan_id, bina_id, kampus_id, veri_gonderme_sikligi) 
                VALUES ('${obj.adi}', ${obj.kat}, ${obj.mekanId}, ${obj.binaId}, ${obj.kampusId}, 
                    ${obj.veriGondermeSikligi})`, (err, result) => {

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
                // console.log(obj);
                connection.query(`UPDATE cihazlar SET adi='${obj.adi}' , kat=${obj.kat}, mekan_id=${obj.mekanId}, 
                bina_id = ${obj.binaId}, kampus_id = ${obj.kampusId},
                veri_gonderme_sikligi = ${obj.veriGondermeSikligi}, aktif = ${obj.aktif}, eklenme_tarihi = '${obj.eklenmeTarihi}' 
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

    updateIpAddress(id, ipAddress) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                // console.log(obj);
                connection.query(`UPDATE cihazlar SET ip_adresi = '${ipAddress}' 
                WHERE id=${id}`, (err, result) => {

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

    updateAktif(id, aktif) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`UPDATE cihazlar SET aktif = '${aktif}' 
                WHERE id=${id}`, (err, result) => {

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
                connection.query(`UPDATE cihazlar SET durum=false WHERE id = ${id}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
                    else resolve(new ErrorResult(Messages.Unsuccessful));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        })
    }

    getAllByMekan(mekanId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM cihazlar where mekan_id = ${mekanId} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getAllByBina(binaId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM cihazlar where bina_id = ${binaId} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getAllByKampus(kampusId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM cihazlar where kampus_id = ${kampusId} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getAllByAktif(aktif){
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM cihazlar where aktif = ${aktif} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getAllByDurum(durum){
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM cihazlar where durum = ${durum} durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

}

module.exports = CihazlarDal;