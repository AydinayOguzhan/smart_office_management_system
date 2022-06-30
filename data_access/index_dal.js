const IndexObject = require("../entities/index_object")
const SuccessDataResult = require("../core/utilities/results/success_data_result")
const ErrorDataResult = require("../core/utilities/results/error_data_result");
const ErrorResult = require("../core/utilities/results/error_result");

class IndexDAL{
    getAll(){
        return new SuccessDataResult("Başarılı", [{id:1,name:"Success Data Result çalışıyor"},{id:2,name:"Sıkıntı yok"}]);
        // return new ErrorDataResult("Başarısız", [{id:1,name:"Error Data Result çalışıyor"},{id:2,name:"Sıkıntı yok"}]);
    }

    getById(id){
        if(id != 1){
            return new ErrorResult(`${id} numaralı id'ye bağlı bir veri bulunmamaktadır `);
        } 
        return new SuccessDataResult("Başarılı", {id:id,name:"Lorem ipsum dolor sit amet"});
    }
}

module.exports = IndexDAL;