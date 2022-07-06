const CihazlarDal = require("../data_access/cihazlar_dal");

class CihazlarService{
    constructor(){
        this.dal = new CihazlarDal();
    }

    async getAll(){
        var result = await this.dal.getAll();
        return result;
    }

    async getById(id){
        var result = await this.dal.getById(id);
        return result;
    }

    async add(obj){
        obj.aktif = true;
        obj.durum = true;
        var result = await this.dal.add(obj);
        return result;
    }

    async update(obj){
        var result = await this.dal.update(obj);
        return result;
    }

    async delete(id){
        var result = await this.dal.delete(id);
        return result;
    }

    async getAllByMekan(mekanId){
        var result = await this.dal.getAllByMekan(mekanId);
        return result;
    }

    async getAllByBina(binaId){
        var result = await this.dal.getAllByMekan(binaId);
        return result;
    }

    async getAllByKampus(kampusId){
        var result = await this.dal.getAllByKampus(kampusId);
        return result;
    }

}

module.exports = CihazlarService;