const extractToken = require("../../utilities/security/extract_token");
const OperationOperationClaimService = require('../../../business/operation_operation_claim_service');

class SecurityAspectHelper {
    constructor() {
        this.operationOperationClaimService = new OperationOperationClaimService();
    }

    async help(methodName, token) {
        const extractResponse = extractToken(token);
        if (extractResponse.success === false) return extractResponse;

        const operationOperationClaims = await this.operationOperationClaimService.getOperationOperationClaimsByName(methodName);
        if (operationOperationClaims.success === false) return operationOperationClaims;

        return {extractResponse, operationOperationClaims};
    }
}

module.exports = SecurityAspectHelper;