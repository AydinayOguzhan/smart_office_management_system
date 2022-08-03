const CihazlarDal = require("../data_access/cihazlar_dal");
const Operations = require("../core/utilities/secured_operations/secured_operations");
const logger = require("../core/logger/winston_logger");
var winLog = require("../core/logger/winston_logger");

class CihazlarService{
    constructor(){
        this.dal = new CihazlarDal();
    }
    
    async getAll(userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAll();
        return result;
    }

    async getById(id, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getById(id);
        return result;
    }

    async add(obj, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        obj.aktif = true;
        obj.durum = true;
        var result = await this.dal.add(obj);
        return result;
    }

    async update(obj, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.update(obj);
        return result;
    }

    async delete(id, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.delete(id);
        return result;
    }

    async getAllByMekan(mekanId, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByMekan(mekanId);
        return result;
    }

    async getAllByBina(binaId, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByBina(binaId);
        return result;
    }

    async getAllByKampus(kampusId, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByKampus(kampusId);
        return result;
    }

    async getAllByAktif(aktif, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByAktif(aktif);
        return result;
    }

    async getAllByDurum(durum, userId){
        const operationResult = await Operations.securedOperations(userId, 1);
        if (operationResult.success === false) {
            return operationResult;
        }
        var result = await this.dal.getAllByDurum(durum);
        return result;
    }

}

module.exports = CihazlarService;