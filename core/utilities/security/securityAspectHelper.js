const securityAspect = require("../../../core/aspects/security_aspect");
const extractToken = require("../../utilities/security/extract_token");
const OperationOperationClaimService = require('../../../business/operation_operation_claim_service');
const ErrorResult = require("../results/error_result");
const Messages = require("../constants/messages");

class SecurityAspectHelper {
    constructor() {
        this.operationOperationClaimService = new OperationOperationClaimService();
    }

    async help(methodName, token) {
        const extractResponse = extractToken(token);
        if (extractResponse.success === false) return extractResponse;

        const operationOperationClaims = await this.operationOperationClaimService.getOperationOperationClaimsByName(methodName);
        if (operationOperationClaims.success === false) return new ErrorResult(Messages.NotFoundClaimForThisOperation);

        const securityAspectResult = securityAspect(extractResponse.data, operationOperationClaims.data);
        return securityAspectResult;
    }
}

module.exports = SecurityAspectHelper;