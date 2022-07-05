const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");
const VeriLimitObject = require("../entities/veri_limit_object");

class VeriLimitDal {
    getAll() {
        return new Promise((resolve, reject) => {
            const veriLimitleri = new Array();
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM veri_limitleri", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    result.forEach(element => {
                        veriLimitleri.push({
                            id: element.id, adi:element.adi, altLimit: element.alt_limit, ustLimit: element.ust_limit, 
                            yerId: element.yer_id, eklenmeTarihi: element.eklenme_tarihi, durum: element.durum
                        });
                    });
                    resolve(new SuccessDataResult(Messages.Successful, veriLimitleri));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            const veriLimit = new VeriLimitObject();
            connection.connect((successResponse) => {
                connection.query(`select * from veri_limitleri where id=${id}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    result.forEach(element => {
                        veriLimit.id = element.id;
                        veriLimit.adi = element.adi;
                        veriLimit.altLimit = element.alt_limit;
                        veriLimit.ustLimit = element.ust_limit;
                        veriLimit.yerId = element.yer_id;
                        veriLimit.eklenmeTarihi = element.eklenme_tarihi;
                        veriLimit.durum = element.durum
                    });
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
                connection.query(`INSERT INTO veri_limitleri(adi, alt_limit, ust_limit, yer_id, eklenme_tarihi, durum) 
                    VALUES ('${obj.adi}', ${obj.altLimit}, ${obj.ustLimit}, ${obj.yerId}, '${obj.eklenmeTarihi}', ${obj.durum})`, 
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
                console.log(obj);
                connection.query(`UPDATE veri_limitleri SET adi='${obj.adi}', alt_limit = ${obj.altLimit}, ust_limit = ${obj.ustLimit},
                yer_id = ${obj.yerId}, eklenme_tarihi = '${obj.eklenmeTarihi}' WHERE id=${obj.id}`, (err, result) => {

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