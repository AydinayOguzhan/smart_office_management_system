const jwtAdapter = require("../utilities/security/jwt/jwt_adapter");
const ErrorResult = require("../utilities/results/error_result");
const SuccessResult = require("../utilities/results/success_result");
const Messages = require("../utilities/constants/messages");

function securityAspect(token, methodName, canOpenOperationClaims=[]){
    let adapter = new jwtAdapter();
    let result = adapter.VerifyToken(token);
    if (result.success === false){
        return result;
    }
    const userOperationClaims = result.operationClaims;
    for (let i = 0; i < canOpenOperationClaims.length; i++) {
        let canOpenOperationClaim = canOpenOperationClaims[i].yetki;
        for (let j = 0; j < userOperationClaims.length; j++) {
            let userOperationClaim = userOperationClaims[j].name;
            if (canOpenOperationClaim === userOperationClaim) return;
        }
    }
    return new ErrorResult(Messages.AuthorizationDenied);
}

module.exports = securityAspect;