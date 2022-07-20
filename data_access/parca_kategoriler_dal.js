const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const ParcaKategorilerObject = require("../entities/parca_kategoriler_object");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class ParcaKategorilerDal {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM parca_kategoriler", (err, result) => {
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
                connection.query(`select * from parca_kategoriler where id=${id}`, (err,result)=>{
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
                connection.query(`INSERT INTO parca_kategoriler(adi) VALUES ("${obj.adi}")`, (err,result)=>{
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
                connection.query(`UPDATE parca_kategoriler SET adi="${obj.adi}" WHERE id=${obj.id}`, (err,result)=>{
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
                connection.query(`DELETE FROM parca_kategoriler WHERE id=${id}`, (err,result)=>{
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

module.exports = ParcaKategorilerDal;