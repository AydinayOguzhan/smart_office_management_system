const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const ParcaKategorilerObject = require("../entities/parca_kategoriler_object");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");
const ParcaObject = require("../entities/parca_object");

class ParcaDal {
    async getAll() {
        return new Promise((resolve, reject) => {
            const parcalarObj = new Array();
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM parcalar", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    result.forEach(element => {
                        parcalarObj.push({
                            id: element.id, cihazId: element.cihaz_id, kategoriId: element.kategori_id,
                            parcaAdi: element.parca_adi, eklenmeTarihi: element.eklenme_tarihi, durum: element.durum
                        });
                    });
                    resolve(new SuccessDataResult(Messages.Successful, parcalarObj));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    async getById(id) {
        return new Promise((resolve, reject) => {
            const parcaObj = new ParcaObject();
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM parcalar where id=${id}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    result.forEach(element => {
                        parcaObj.id = element.id, parcaObj.cihazId = element.cihaz_id, parcaObj.kategoriId = element.kategori_id,
                            parcaObj.parcaAdi = element.parca_adi, parcaObj.eklenmeTarihi = element.eklenme_tarihi, parcaObj.durum = element.durum
                    });
                    resolve(new SuccessDataResult(Messages.Successful, parcaObj));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    async add(obj) {
        return new Promise((resolve,reject)=>{
            connection.connect((successResponse)=>{
                connection.query(`INSERT INTO parcalar(cihaz_id, kategori_id, parca_adi, eklenme_tarihi, durum) VALUES (${obj.cihazId}, ${obj.kategoriId}, '${obj.parcaAdi}', '${obj.eklenmeTarihi}', ${obj.durum})`, (err,result)=>{
                    if(err) resolve(new ErrorResult(err));
                    if(result !== undefined){    
                        if(result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
                        else resolve(new ErrorResult(Messages.Unsuccessful));
                    }
                    else resolve(new ErrorResult(Messages.Unsuccessful));
                });
            },(errorResponse)=>{
                reject(errorResponse);
            });
        });
    }

    async update(obj) {
        return new Promise((resolve,reject)=>{
            connection.connect((successResponse)=>{
                connection.query(`UPDATE parcalar SET cihaz_id=${obj.cihazId}, kategori_id=${obj.kategoriId},
                parca_adi='${obj.parcaAdi}', eklenme_tarihi='${obj.eklenmeTarihi}', durum=${obj.durum} WHERE id = ${obj.id}`, 
                (err,result)=>{
                    if(err) resolve(new ErrorResult(err));
                    if(result !== undefined){    
                        if(result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
                        else resolve(new ErrorResult(Messages.Unsuccessful));
                    }
                    else resolve(new ErrorResult(Messages.Unsuccessful));
                });
            },(errorResponse)=>{
                reject(errorResponse);
            });
        });
    }

    async delete(id) {
        return new Promise((resolve,reject)=>{
            connection.connect((successResponse)=>{
                connection.query(`UPDATE parcalar SET durum=false WHERE id = ${id}`, 
                (err,result)=>{
                    if(err) resolve(new ErrorResult(err));
                    if(result !== undefined){    
                        if(result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
                        else resolve(new ErrorResult(Messages.Unsuccessful));
                    }
                    else resolve(new ErrorResult(Messages.Unsuccessful));
                });
            },(errorResponse)=>{
                reject(errorResponse);
            });
        });
    }

    async getAllByDurum(durum) {
        return new Promise((resolve, reject) => {
            const parcalarObj = new Array();
            console.log(durum);
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM parcalar where durum = ${durum}`, (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    result.forEach(element => {
                        parcalarObj.push({
                            id: element.id, cihazId: element.cihaz_id, kategoriId: element.kategori_id,
                            parcaAdi: element.parca_adi, eklenmeTarihi: element.eklenme_tarihi, durum: element.durum
                        });
                    });
                    resolve(new SuccessDataResult(Messages.Successful, parcalarObj));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    async getAllByDate(startDate, endDate) {
        return new Promise((resolve, reject) => {
            const parcalarObj = new Array();
            connection.connect((successResponse) => {
                console.log(startDate);
                console.log(endDate);
                connection.query(`SELECT * FROM parcalar WHERE (eklenme_tarihi BETWEEN '${startDate}' AND '${endDate}')`, 
                (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    result.forEach(element => {
                        parcalarObj.push({
                            id: element.id, cihazId: element.cihaz_id, kategoriId: element.kategori_id,
                            parcaAdi: element.parca_adi, eklenmeTarihi: element.eklenme_tarihi, durum: element.durum
                        });
                    });
                    resolve(new SuccessDataResult(Messages.Successful, parcalarObj));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }

    async getAllByCategory(kategoriId) {
        return new Promise((resolve, reject) => {
            const parcalarObj = new Array();
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM parcalar WHERE kategori_id = ${kategoriId}`, 
                (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    result.forEach(element => {
                        parcalarObj.push({
                            id: element.id, cihazId: element.cihaz_id, kategoriId: element.kategori_id,
                            parcaAdi: element.parca_adi, eklenmeTarihi: element.eklenme_tarihi, durum: element.durum
                        });
                    });
                    resolve(new SuccessDataResult(Messages.Successful, parcalarObj));
                });
            }, (errorResponse) => {
                reject(errorResponse);
            })
        });
    }
}

module.exports = ParcaDal;