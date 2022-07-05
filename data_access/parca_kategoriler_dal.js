const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const ParcaKategorilerObject = require("../entities/parca_kategoriler_object");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class ParcaKategorilerDal {
    getAll() {
        return new Promise((resolve, reject) => {
            const parcaKategorilerObj = new Array();
            connection.connect((successResponse) => {
                connection.query("SELECT * FROM parca_kategoriler", (err, result) => {
                    if (err) throw err;
                    if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    result.forEach(element => {
                        parcaKategorilerObj.push({ id: element.id, adi: element.adi });
                    });
                    resolve(new SuccessDataResult(Messages.Successful, parcaKategorilerObj));
                });  
            },(errorResponse) =>{
                reject(errorResponse);
            })
        });
    }

    getById(id) {
        return new Promise((resolve, reject) =>{
            const parcaKategorilerObj = new ParcaKategorilerObject();
            connection.connect((successResponse)=>{
                connection.query(`select * from parca_kategoriler where id=${id}`, (err,result)=>{
                    if(err) throw err;
                    if(result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                    console.log(result);
                    result.forEach(element => {
                        parcaKategorilerObj.id = element.id;
                        parcaKategorilerObj.adi = element.adi
                    });
                    resolve(new SuccessDataResult(Messages.Successful,parcaKategorilerObj));
                });
            },(errorResponse) =>{
                reject(errorResponse);
            });
        });
    }

    add(obj) {

    }

    update(obj) {

    }

    delete(id) {

    }
}

module.exports = ParcaKategorilerDal;