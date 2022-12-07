const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class CihazKategorilerDal {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM cihaz_kategoriler where durum = 1", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...parcaKategorilerObj] = result;
                    resolve(new SuccessDataResult(Messages.Successful, parcaKategorilerObj));
                });  
            },(errorResponse) =>{
                reject(errorResponse);
            })
        });
    }

    getAllWithoutDurum() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM cihaz_kategoriler", (err, result) => {
                    if (err) resolve(new ErrorResult(err));
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [...parcaKategorilerObj] = result;
                    resolve(new SuccessDataResult(Messages.Successful, parcaKategorilerObj));
                });  
            },(errorResponse) =>{
                reject(errorResponse);
            })
        });
    }

    getById(id) {
        return new Promise((resolve, reject) =>{
            connection.connect((successResponse)=>{
                connection.query(`select * from cihaz_kategoriler where id=${id} and durum = 1`, (err,result)=>{
                    if(err) resolve(new ErrorResult(err));
                    if(result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    const [parcaKategorilerObj] = result;
                    resolve(new SuccessDataResult(Messages.Successful,parcaKategorilerObj));
                });
            },(errorResponse) =>{
                reject(errorResponse);
            });
        });
    }

    add(obj) {
        return new Promise((resolve,reject)=>{
            connection.connect((successResponse)=>{
                connection.query(`INSERT INTO cihaz_kategoriler(adi, durum) VALUES ("${obj.adi}", 1)`, (err,result)=>{
                    if(err) resolve(new ErrorResult(err));
                    if(result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
                    else resolve(new ErrorResult(Messages.Unsuccessful));
                });
            },(errorResponse)=>{
                reject(errorResponse);
            });
        });
    }

    update(obj) {
        return new Promise((resolve,reject)=>{
            connection.connect((successResponse)=>{
                connection.query(`UPDATE cihaz_kategoriler SET adi="${obj.adi}" WHERE id=${obj.id}`, (err,result)=>{
                    if(err) resolve(new ErrorResult(err));
                    if(result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
                    else resolve(new ErrorResult(Messages.Unsuccessful));
                });
            },(errorResponse)=>{
                reject(errorResponse);
            });
        });
    }

    delete(id) {
        return new Promise((resolve,reject)=>{
            connection.connect((successResponse)=>{
                connection.query(`UPDATE cihaz_kategoriler set durum = 0 WHERE id=${id}`, (err,result)=>{
                    if(err) resolve(new ErrorResult(err));
                    if(result.protocol41 === true) resolve(new SuccessResult(Messages.Successful));
                    else resolve(new ErrorResult(Messages.Unsuccessful));
                });
            },(errorResponse)=>{
                reject(errorResponse);
            });
        })
    }
}

module.exports = CihazKategorilerDal;