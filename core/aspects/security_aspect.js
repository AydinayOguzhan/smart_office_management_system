const jwtAdapter = require("../utilities/security/jwt/jwt_adapter");
const ErrorResult = require("../utilities/results/error_result");
const SuccessResult = require("../utilities/results/success_result");

function securityAspect(email, token, methodName){
    let adapter = new jwtAdapter();
    let result = adapter.VerifyToken(token);
    if (result.success === false){
        return result;
    }

    //TODO: Veritabanından belirtilen methodName'e hangi yetkiler erişebilir getir.
    const canOpenOperationClaims = [{id:1, yetki:"admin"},{id:2, yetki:"yönetici"}, {id:3, yetki:"kullanıcı"}];
    const userOperationClaims = result.operationClaims;
    console.log(userOperationClaims)

    for (let i = 0; i < canOpenOperationClaims.length; i++) {
        let canOpenOperationClaim = canOpenOperationClaims[i].yetki;
        for (let j = 0; j < userOperationClaims.length; j++) {
            let userOperationClaim = userOperationClaims[j].yetki;
            if (canOpenOperationClaim === userOperationClaim) return;
        }
    }
    return new ErrorResult("Yetki reddedildi");
}

module.exports = securityAspect;