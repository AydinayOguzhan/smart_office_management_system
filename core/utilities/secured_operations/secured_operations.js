const UserOperationClaimService = require("../../../business/user_operation_claim_service");
const connection = require("../../../data_access/connections/connection");
const Messages = require("../constants/messages");
const ErrorResult = require("../results/error_result");
const SuccessResult = require("../results/success_result");

class Operations {
    static async securedOperations(userId, ...operations) {
        const userOperationClaimService = new UserOperationClaimService();
        const claim = await userOperationClaimService.getByUserId(userId);
        if (claim.success === false || claim.data.durum === 0) {
            return new ErrorResult(Messages.UserNotFound);
        }

        const result = operations.find(element => claim.data.operation_claim_id === element);
        if (result === undefined) {
            return new ErrorResult(Messages.AuthorizationDenied);
        }
        return new SuccessResult(Messages.Successful);
    }
}

module.exports = Operations;