const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("./connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class OperationDal {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM public."Operations";`,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                        const [...operations] = result.rows;
                        resolve(new SuccessDataResult(Messages.Successful, operations));
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    add(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`INSERT INTO public."Operations"(name) VALUES ('${obj.name}');`,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        else resolve(new SuccessResult(Messages.Successful));
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }
}

module.exports = OperationDal;