const CihazlarDal = require("../data_access/cihazlar_dal");
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
            kategoriId: {type:"number", optional:false},
            meksisKod: {type:"string", optional:false},
            binaId: {type:"string", optional:false},
            kampusId: {type:"string", optional:false},
            veriGondermeSikligi: {type:"number", optional:true}
        }
    }


    async getAll() {
        var result = await this.dal.getAll();
        return result;
    }

    async getAllByWithoutDurum() {
        var result = await this.dal.getAllByWithoutDurum();
        return result;
    }

    async getById(id) {
        var result = await this.dal.getById(id);
        return result;
    }

    async add(obj) {
        console.log(obj);
        var check = this.v.compile(this.schema);
        var validatorResult = check(obj);
        if (Array.isArray(validatorResult)) {
            return validatorResult;
        }

        var result = await this.dal.add(obj);
        return result;
    }

    async update(obj) {
        var check = this.v.compile(this.schema);
        var validatorResult = check(obj);
        if (Array.isArray(validatorResult)) {
            return validatorResult;
        }

        var result = await this.dal.update(obj);
        return result;
    }

    async updateIpAddress(id, ipAddress) {
        var result = await this.dal.updateIpAddress(id, ipAddress);
        return result;
    }

    async delete(id) {
        var result = await this.dal.delete(id);
        return result;
    }

    async getAllByMeksis(meksisKod) {
        var result = await this.dal.getAllByMeksis(meksisKod);
        return result;
    }

    async getAllByBina(binaId) {
        var result = await this.dal.getAllByBina(binaId);
        return result;
    }

    async getAllByKampus(kampusId) {
        var result = await this.dal.getAllByKampus(kampusId);
        return result;
    }

    async getAllByAktif(aktif) {
        var result = await this.dal.getAllByAktif(aktif);
        return result;
    }

    async getAllByDurum(durum) {
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