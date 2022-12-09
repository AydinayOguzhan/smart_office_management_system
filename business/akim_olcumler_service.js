var winLog = require("../core/logger/winston_logger");
const AkimOlcumlerDal = require("../data_access/akim_olcumler_dal");
const Validator = require("../node_modules/fastest-validator");

class AkimOlcumService {
    constructor() {
        this.dal = new AkimOlcumlerDal();
    }

    async getAll() {
        var result = await this.dal.getAll();
        // console.log(result);
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
        this.checkIfEmpty(obj);

        var result = await this.dal.add(obj);
        return result;
    }

    async delete(id) {
        var result = await this.dal.delete(id);
        return result;
    }

    async getAllByCihazId(cihazId) {
        var result = await this.dal.getAllByCihazId(cihazId);
        return result;
    }

    async getAllBySicaklik(loverLimit, upperLimit) {
        var result = await this.dal.getAllBySicaklik(loverLimit, upperLimit);
        return result;
    }

    async getAllBySicaklikMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit) {
        var result = await this.dal.getAllBySicaklikMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit);
        return result;
    }

    async getAllByNem(loverLimit, upperLimit) {
        var result = await this.dal.getAllByNem(loverLimit, upperLimit);
        return result;
    }

    async getAllByNemMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit) {
        var result = await this.dal.getAllByNemMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit);
        return result;
    }

    async getAllByAkim(loverLimit, upperLimit) {
        var result = await this.dal.getAllByAkim(loverLimit, upperLimit);
        return result;
    }

    async getAllByAkimMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit) {
        var result = await this.dal.getAllByAkimMeksis(meksisKod, binaId, kampusId, loverLimit, upperLimit);
        return result;
    }

    async getAllByMeksis(meksis_kod, bina_id, mekan_id) {
        var obj = this.checkMeksis(meksis_kod, bina_id, mekan_id);

        return await this.dal.getAllByMeksis(obj);
    }

    checkMeksis(meksis_kod, bina_id, mekan_id) {
        var obj;
        if (bina_id === "," || bina_id === "{bina_id}") {
            obj = { meksis_kod: meksis_kod };
        } else if (mekan_id === "," || mekan_id === "{mekan_id}") {
            obj = { meksis_kod: meksis_kod, bina_id: bina_id };
        } else {
            obj = { meksis_kod: meksis_kod, bina_id: bina_id, mekan_id: mekan_id };
        }
        obj.durum = 1;
        return obj;
    }

    checkIfEmpty(obj) {
        var emptyObjs = new Array();
        for (var key in obj) {
            var element = obj[key];
            if (element === "" || element === null) {
                emptyObjs.push(key);
            }
        }
        if (emptyObjs.length !== 0) {
            winLog.error(`Boş ölçümler: ${emptyObjs}`);
        }
    }
}

module.exports = AkimOlcumService;