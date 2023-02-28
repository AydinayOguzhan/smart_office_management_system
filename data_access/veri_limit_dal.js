const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class VeriLimitDal {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM veri_limitleri where durum = 1", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...veriLimitleri] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, veriLimitleri));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    getAllByWithoutDurum() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM veri_limitleri", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...veriLimitleri] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, veriLimitleri));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    getAllByCihazId(cihazId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM veri_limitleri where cihaz_id = ${cihazId} and durum  = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...veriLimitleri] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, veriLimitleri));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    getAllByKategoriId(kategoriId) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM veri_limitleri where kategori_id = ${kategoriId} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...veriLimitleri] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, veriLimitleri));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            })
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select * from veri_limitleri where id=${id} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [veriLimit] = result.rows;
                    resolve(new SuccessDataResult(Messages.Successful, veriLimit));
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
                connection.query(`INSERT INTO veri_limitleri(cihaz_id, kategori_id, adi, alt_limit, ust_limit, eklenme_tarihi, durum) 
                    VALUES (${obj.cihazId},${obj.kategoriId},'${obj.adi}', '${obj.altLimit}', '${obj.ustLimit}', '${obj.eklenme_tarihi}', 1)`,
                    (err, result) => {

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
                connection.query(`UPDATE veri_limitleri SET cihaz_id=${obj.cihazId}, kategori_id=${obj.kategoriId}, adi='${obj.adi}', alt_limit = '${obj.altLimit}', ust_limit = '${obj.ustLimit}',
                eklenme_tarihi = '${obj.eklenmeTarihi}' WHERE id=${obj.id}`, (err, result) => {

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
                connection.query(`UPDATE veri_limitleri SET durum=0 WHERE id = ${id}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    else resolve(new SuccessResult(Messages.Successful));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        })
    }
}

module.exports = VeriLimitDal;