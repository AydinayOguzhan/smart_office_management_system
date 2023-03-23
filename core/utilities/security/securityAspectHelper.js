const methodInterceptor = require("../../../core/method_interceptor/method_interceptor");
const securityAspect = require("../../../core/aspects/security_aspect");
const extractToken = require("../../utilities/security/extract_token");
const OperationOperationClaimService = require('../../../business/operation_operation_claim_service');
const ErrorResult = require("../results/error_result");
const Messages = require("../constants/messages");

class SecurityAspectHelper {
    constructor() {
        this.operationOperationClaimService = new OperationOperationClaimService();
    }

    async help(service, methodName, token) {
        const extractResponse = extractToken(token);
        if (extractResponse.success === false) return extractResponse;

        const operationOperationClaims = await this.operationOperationClaimService.getOperationOperationClaimsByName(methodName);
        if (operationOperationClaims.success === false) return new ErrorResult(Messages.NotFoundClaimForThisOperation);

        methodInterceptor.inject(service, securityAspect, "before", "method", methodName);

        return {extractResponse, operationOperationClaims};
    }
}

module.exports = SecurityAspectHelper;