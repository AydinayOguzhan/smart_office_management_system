const CihazlarDal = require("../data_access/cihazlar_dal");
const Operations = require("../core/utilities/secured_operations/secured_operations");
const logger = require("../core/logger/winston_logger");
var winLog = require("../core/logger/winston_logger");
const RaspBerryServerAdapter = require("./adapters/raspberry_server_adapter");
const Validator = require("../node_modules/fastest-validator");

class CihazlarService {
    constructor() {
        this.dal = new CihazlarDal();
      
        this.v = new Validator();
        this.schema = {
            adi: {type:"string", min:3, optional:false},
            kat: {type:"number", optional:false},
            mekan_id: {type:"number", optional:false},
            bina_id: {type:"number", optional:false},
            kampus_id: {type:"number", optional:false},
            universite_id: {type:"number", optional:true},
            veri_gonderme_sikligi: {type:"number", optional:true}
        }
    }


    async getAll(userId) {
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAll();
        return result;
    }

    async getAllByWithoutDurum(userId) {
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByWithoutDurum();
        return result;
    }

    async getById(id, userId) {
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getById(id);
        return result;
    }

    async add(obj, userId) {
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }

        var check = this.v.compile(this.schema);
        var validatorResult = check(obj);
        if (Array.isArray(validatorResult)) {
            return validatorResult;
        }

        var result = await this.dal.add(obj);
        return result;
    }

    async update(obj, userId) {
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }

        var check = this.v.compile(this.schema);
        var validatorResult = check(obj);
        if (Array.isArray(validatorResult)) {
            return validatorResult;
        }

        var result = await this.dal.update(obj);
        return result;
    }

    async updateIpAddress(id, ipAddress, userId) {
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.updateIpAddress(id, ipAddress);
        return result;
    }

    async delete(id, userId) {
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }

        var result = await this.dal.delete(id);
        return result;
    }

    async getAllByMekan(mekanId, userId) {
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByMekan(mekanId);
        return result;
    }

    async getAllByBina(binaId, userId) {
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByBina(binaId);
        return result;
    }

    async getAllByKampus(kampusId, userId) {
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByKampus(kampusId);
        return result;
    }

    async getAllByAktif(aktif, userId) {
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByAktif(aktif);
        return result;
    }

    async getAllByDurum(durum, userId) {
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByDurum(durum);
        return result;
    }

    async checkIfCihazWorks(timeOut) {
        var adapter = new RaspBerryServerAdapter();

        while (true) {
            var result = await this.dal.getAll();
            for (let i = 0; i < result.data.length; i++) {
                const element = result.data[i];
                var res = await adapter.isRunning(element.ip_adresi);

                if (res === 200) {
                    // console.log("başarılı");
                    if (element.aktif === 0) {
                        await this.dal.updateAktif(element.id, 1);
                        winLog.info(`Id: ${element.id}- Name: ${element.adi} cihaz çalışmaya başladı`);
                        // console.log(`Id: ${element.id}- Name: ${element.adi} cihaz çalışmaya başladı`);
                        // console.log("aktif yapıldı");
                    }
                } else {
                    // console.log("başarısız");
                    if (element.aktif === 1) {
                        await this.dal.updateAktif(element.id, 0);
                        winLog.error(`Id: ${element.id}- Name: ${element.adi} cihaz çalışmayı durdurdu`);
                        // console.log(`Id: ${element.id}- Name: ${element.adi} cihaz çalışmayı durdurdu`);
                        // console.log("deaktif yapıldı");
                    }
                }

                await new Promise((resolve)=>{ setTimeout(resolve, parseInt(timeOut))});
            }
        }
    }

}

module.exports = CihazlarService;