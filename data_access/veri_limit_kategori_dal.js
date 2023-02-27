const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class VeriLimitKategoriDal {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM veri_limit_kategoriler where durum = 1", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...veriLimitleri] = result.rows;
                    //TODO: Veri bulunamadığında başarılı yerine veri bulunamadı mesajı döndürsün
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
                connection.query("SELECT * FROM veri_limit_kategoriler", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...veriLimitleri] = result.rows;
                    //TODO: Veri bulunamadığında başarılı yerine veri bulunamadı mesajı döndürsün
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
                connection.query(`select * from veri_limit_kategoriler where id=${id} and durum = 1`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [veriLimit] = result.rows;
                    //TODO: Veri bulunamadığında başarılı yerine veri bulunamadı mesajı döndürsün
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
                console.log(obj);
                connection.query(`INSERT INTO veri_limit_kategoriler(adi, eklenme_tarihi, durum) 
                    VALUES ('${obj.adi}', '${obj.eklenme_tarihi}', 1)`,
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
                connection.query(`UPDATE veri_limit_kategoriler SET adi='${obj.adi}' WHERE id=${obj.id}`, (err, result) => {
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
                connection.query(`UPDATE veri_limit_kategoriler SET durum=0 WHERE id = ${id}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    else resolve(new SuccessResult(Messages.Successful));
                });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        })
    }
}

module.exports = VeriLimitKategoriDal;