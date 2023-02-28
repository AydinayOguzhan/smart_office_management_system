const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class CihazlarDal {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("select * from cihazlar where durum = 1", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    getAllByWithoutDurum() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM cihazlar", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select * from cihazlar where id=${id} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    //array destructuring
                    const [cihazObj] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, cihazObj));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    getAllByKategoriId(kategoriId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select * from cihazlar where kategori_id=${kategoriId} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    //array destructuring
                    const [...cihazObj] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, cihazObj));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    add(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                // console.log(obj);
                connection.query(`INSERT INTO cihazlar(kategori_id, adi, meksis_kod, bina_id, kampus_id, veri_gonderme_sikligi, eklenme_tarihi) 
                VALUES (${obj.kategoriId},'${obj.adi}', '${obj.meksisKod}', '${obj.binaId}', '${obj.kampusId}', 
                    ${obj.veriGondermeSikligi}, '${obj.eklenme_tarihi}')`, (err, result) => {

                    if (err) resolve(new ErrorResult(err));
                    else resolve(new SuccessResult(Messages.Successful));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    update(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                // console.log(obj);
                connection.query(`UPDATE cihazlar SET kategori_id='${obj.kategoriId}', adi='${obj.adi}' , meksis_kod='${obj.meksisKod}', 
                bina_id = '${obj.binaId}', kampus_id = '${obj.kampusId}',
                veri_gonderme_sikligi = ${obj.veriGondermeSikligi}, aktif = ${obj.aktif}
                WHERE id=${obj.id}`, (err, result) => {

                    if (err) resolve(new ErrorResult(err));
                    else resolve(new SuccessResult(Messages.Successful));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
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
                    else resolve(new SuccessResult(Messages.Successful));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    updateAktif(id, aktif) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`UPDATE cihazlar SET aktif = '${aktif}' 
                WHERE id=${id}`, (err, result) => {

                    if (err) resolve(new ErrorResult(err));
                    else resolve(new SuccessResult(Messages.Successful));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`UPDATE cihazlar SET durum=false WHERE id = ${id}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    else resolve(new SuccessResult(Messages.Successful));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        })
    }

    getAllByMeksis(meksisKod) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM cihazlar where meksis_kod = '${meksisKod}' and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    getAllByBina(binaId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM cihazlar where bina_id = ${binaId} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    getAllByKampus(kampusId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM cihazlar where kampus_id = ${kampusId} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    getAllByAktif(aktif) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM cihazlar where aktif = ${aktif} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    getAllByDurum(durum) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM cihazlar where durum = ${durum} durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...cihazlar] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

}

module.exports = CihazlarDal;