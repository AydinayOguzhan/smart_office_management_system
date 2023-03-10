const SuccessResult = require("../core/utilities/results/success_result");
const SuccessDataResult = require("../core/utilities/results/success_data_result");
const connection = require("./connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class OperationOperationClaimDal {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`SELECT * FROM public."OperationOperationClaims";`,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                        const [...operationOperationClaims] = result.rows;
                        resolve(new SuccessDataResult(Messages.Successful, operationOperationClaims));
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    getAllDetails() {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select ooc.operation_id, o.name as operation_name, ooc.operation_claim_id, oc.name as operation_claim_name from 
                public."OperationOperationClaims" as ooc inner join public."Operations" as o on
                ooc.operation_id = o.id 
                inner join public."OperationClaims" as oc on ooc.operation_claim_id = oc.id;`,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                        const [...operationOperationClaims] = result.rows;
                        resolve(new SuccessDataResult(Messages.Successful, operationOperationClaims));
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    getOperationOperationClaimsByName(operationName) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`select ooc.operation_id, o.name as operation_name, ooc.operation_claim_id, oc.name as operation_claim_name from 
                public."OperationOperationClaims" as ooc inner join public."Operations" as o on
                ooc.operation_id = o.id 
                inner join public."OperationClaims" as oc on ooc.operation_claim_id = oc.id
                where o.name = '${operationName}' `,
                    (err, result) => {
                        if (err) resolve(new ErrorResult(err));
                        if (result.rowCount <= 0) resolve(new ErrorResult(Messages.DataNotFound));
                        const [...operationOperationClaims] = result.rows;
                        resolve(new SuccessDataResult(Messages.Successful, operationOperationClaims));
                    });
            }, (errorResponse) => {
                reject(new ErrorResult(errorResponse));
            });
        });
    }

    addOperationOperationClaim(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`INSERT INTO public."OperationOperationClaims"(
                    operation_id, operation_claim_id)
                    VALUES (${obj.operation_id}, ${obj.operation_claim_id});`,
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

module.exports = OperationOperationClaimDal;