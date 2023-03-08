const ErrorResult = require("../results/error_result");
const SuccessDataResult = require("../results/success_data_result");

function ExtractToken(header){
    if (header === undefined) return new ErrorResult("Token bulunamadı");
    let bearer = header.split(" ")[0];
    let token = header.split(" ")[1];

    if (bearer === undefined || token === undefined) return new ErrorResult("Token bulunamadı");
    else return new SuccessDataResult(bearer, token);
}

module.exports = ExtractToken;