const SuccessResult = require("../core/utilities/results/success_result");
const connection = require("../data_access/connections/connection");
const Messages = require("../core/utilities/constants/messages");
const ErrorResult = require("../core/utilities/results/error_result");

class UserOperationClaimDal {

    add(obj) {
        return new Promise((resolve, reject) => {
            connection.connect((successResponse) => {
                connection.query(`INSERT INTO public."UserOperationClaims"(user_id, operation_claim_id)
                    VALUES (${obj.user_id}, ${obj.operation_claim_id});`,
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

module.exports = UserOperationClaimDal;