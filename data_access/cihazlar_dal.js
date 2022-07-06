const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const ParcaKategorilerObject = require("../entities/parca_kategoriler_object");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class CihazlarDal {
    getAll() {
        return new Promise((resolve, reject) => {
            const cihazlar = new Array();
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM cihazlar", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    result.forEach(element => {
                        cihazlar.push({
                            id: element.id, adi: element.adi, kat: element.kat, mekanId: element.mekan_id,
                            binaId: element.bina_id, kampusId: element.kampus_id, universiteId: element.universite_id,
                            veriGondermeSikligi: element.veri_gonderme_sikligi,
                            aktif: element.aktif, eklenmeTarihi: element.eklenme_tarihi, durum: element.durum
                        });
                    });
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            const cihazObj = new ParcaKategorilerObject();
            connection.connect((successResponse) => {
                connection.query(`select * from cihazlar where id=${id}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    result.forEach(element => {
                        cihazObj.id = element.id;
                        cihazObj.adi = element.adi;
                        cihazObj.kat = element.kat;
                        cihazObj.mekanId = element.mekan_id;
                        cihazObj.binaId = element.bina_id;
                        cihazObj.kampusId = element.kampus_id;
                        cihazObj.universiteId = element.universite_id;
                        cihazObj.veriGondermeSikligi = element.veri_gonderme_sikligi;
                        cihazObj.aktif = element.aktif;
                        cihazObj.eklenmeTarihi = element.eklenme_tarihi;
                        cihazObj.durum = element.durum
                    });
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
                console.log(obj);
                connection.query(`INSERT INTO cihazlar(adi, kat, mekan_id, bina_id, kampus_id, veri_gonderme_sikligi, 
                    aktif, eklenme_tarihi, durum) VALUES ('${obj.adi}', ${obj.kat}, ${obj.mekanId}, ${obj.binaId}, ${obj.kampusId}, 
                    ${obj.veriGondermeSikligi},  ${obj.aktif}, '${obj.eklenmeTarihi}', ${obj.durum})`, (err, result) => {

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
            const cihazlar = new Array();
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM cihazlar where mekan_id = ${mekanId}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    result.forEach(element => {
                        cihazlar.push({
                            id: element.id, adi: element.adi, kat: element.kat, mekanId: element.mekan_id,
                            binaId: element.bina_id, kampusId: element.kampus_id, universiteId: element.universite_id,
                            veriGondermeSikligi: element.veri_gonderme_sikligi,
                            aktif: element.aktif, eklenmeTarihi: element.eklenme_tarihi, durum: element.durum
                        });
                    });
                    resolve(new SuccessDataResult(Messages.Successful, cihazlar));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

}

module.exports = CihazlarDal;