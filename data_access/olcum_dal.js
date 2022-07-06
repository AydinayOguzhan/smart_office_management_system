const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");
const OlcumObject = require("../entities/olcum_object");

class OlcumDal {
    getAll() {
        return new Promise((resolve, reject) => {
            const olcumler = new Array();
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM olcumler", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    result.forEach(element => {
                        olcumler.push({
                            id: element.id, cihazId:element.cihaz_id, isikSiddeti:element.isik_siddeti, sicaklik:element.sicaklik,
                            karbondioksitMiktari:element.karbondioksit_miktari, nem:element.nem, gurultu:element.gurultu,
                            eklenmeTarihi: element.eklenme_tarihi, durum:element.durum
                        });
                    });
                    resolve(new SuccessDataResult(Messages.Successful, olcumler));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            const olcumObj = new OlcumObject();
            connection.connect((successResponse) => {
                connection.query(`select * from olcumler where id=${id}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    result.forEach(element => {
                        olcumObj.id = element.id;
                        olcumObj.cihazId = element.cihaz_id;
                        olcumObj.isikSiddeti = element.isik_siddeti;
                        olcumObj.sicaklik = element.sicaklik;
                        olcumObj.karbondioksitMiktari = element.karbondioksit_miktari;
                        olcumObj.nem = element.nem;
                        olcumObj.gurultu = element.gurultu;                        
                        olcumObj.eklenmeTarihi = element.eklenme_tarihi;
                        olcumObj.durum = element.durum;
                    });
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
                    eklenme_tarihi, durum) VALUES (${obj.cihazId}, '${obj.isikSiddeti}', '${obj.sicaklik}', '${obj.karbondioksitMiktari}', 
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
                console.log(obj);
                connection.query(`UPDATE olcumler SET cihaz_id=${obj.cihazId} , isik_siddeti='${obj.isikSiddeti}', 
                sicaklik='${obj.sicaklik}', karbondioksit_miktari = '${obj.karbondioksitMiktari}', nem = '${obj.nem}', 
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
}

module.exports = OlcumDal;