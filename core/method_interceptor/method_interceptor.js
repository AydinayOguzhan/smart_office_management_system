//Helping function used to get all methods of an object
const ErrorResult = require("../utilities/results/error_result");
const getMethods = (obj) => Object.getOwnPropertyNames(Object.getPrototypeOf(obj).filter(item => typeof obj[item] === "function"));

// Replace the original method with a custom function that will call our aspect when the advice dictates
function replaceMethod(target, methodName, aspect, advice){
    const originalCode = target[methodName];
    target[methodName] = (...args) => {
        let aspectResult;
        const returnedValue = originalCode.apply(target, args);
        if (["before", "around"].includes(advice)){
            aspectResult = aspect.apply(target, args);
        }
        if (["after", "around"].includes(advice)){
            aspectResult = aspect.apply(target, args);
        }
        if ("afterReturning" === advice){
            return aspect.apply(target, [returnedValue])
        }else{
            if (aspectResult !== undefined) return aspectResult;
            return returnedValue;
        }
    }
}

module.exports = {
    //Main method exported: inject the aspect on our target when and where we need to
    inject: function (target, aspect, advice, pointcut, method = null){
        if (pointcut === "method"){
            if (method !== null){
                replaceMethod(target, method, aspect, advice);
            }else {
                //TODO: Check errors
                throw new Error("Bir metoda aspect eklemeye çalışıyorsunuz ancak metot belirlenmemiş");
            }
        }
        if (pointcut === "methods"){
            const methods = getMethods(target);
            methods.forEach(m =>{
                replaceMethod(target, m, aspect, advice);
            })
        }
    }

}