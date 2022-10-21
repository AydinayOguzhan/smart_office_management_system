const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class NotificationDal {

   

    // getById(id) {
    //     return new Promise((resolve, reject) => {
    //         connection.connect((successResponse) => {
    //             connection.query(`select * from cihazlar where id=${id} and durum = 1`, (err, result) => {
    //                 if (err) resolve(new ErrorResult(err));
    //                 if (result.length <= 0) resolve(new ErrorResult(Messages.DataNotFound));
    //                 //array destructuring
    //                 const [cihazObj] = result;
    //                 resolve(new SuccessDataResult(Messages.Successful, cihazObj));
    //             });
    //         }, (errorResponse) => {
    //             reject(errorResponse);
    //         });
    //     });
    // }


}

module.exports = NotificationDal;