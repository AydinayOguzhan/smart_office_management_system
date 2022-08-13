const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class VeriLimitDal {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM veri_limitleri", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...veriLimitleri] = result;
                    resolve(new SuccessDataResult(Messages.Successful, veriLimitleri));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getAllByCihazId(cihazId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM veri_limitleri where cihaz_id = ${cihazId}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...veriLimitleri] = result;
                    resolve(new SuccessDataResult(Messages.Successful, veriLimitleri));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getAllByKategoriId(kategoriId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM veri_limitleri where kategori_id = ${kategoriId}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...veriLimitleri] = result;
                    resolve(new SuccessDataResult(Messages.Successful, veriLimitleri));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select * from veri_limitleri where id=${id}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [veriLimit] = result;
                    resolve(new SuccessDataResult(Messages.Successful, veriLimit));
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
                connection.query(`INSERT INTO veri_limitleri(cihaz_id, kategori_id, adi, alt_limit, ust_limit, eklenme_tarihi, durum) 
                    VALUES ('${obj.cihazId}','${obj.kategoriId}','${obj.adi}', ${obj.altLimit}, ${obj.ustLimit}, '${obj.eklenmeTarihi}', ${obj.durum})`, 
                    (err, result) => {

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
                connection.query(`UPDATE veri_limitleri SET cihaz_id='${obj.cihazId}', kategori_id='${obj.kategoriId}', adi='${obj.adi}', alt_limit = ${obj.altLimit}, ust_limit = ${obj.ustLimit},
                eklenme_tarihi = '${obj.eklenmeTarihi}' WHERE id=${obj.id}`, (err, result) => {

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
                connection.query(`UPDATE veri_limitleri SET durum=false WHERE id = ${id}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
                    else resolve(new ErrorResult(Messages.Unsuccessful));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            });
        })
    }
}

module.exports = VeriLimitDal;