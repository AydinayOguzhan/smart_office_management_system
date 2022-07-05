const date = require("date-and-time");

class CihazObject{
    constructor(id,adi,kat,mekanId,binaId,kampusId,universiteId,veriGondermeSikligi,aktif,durum){
        this.id = id;
        this.adi = adi;
        this.kat = kat;
        this.mekanId = mekanId;
        this.binaId = binaId;
        this.kampusId = kampusId;
        this.universiteId = universiteId;
        this.veriGondermeSikligi = veriGondermeSikligi;
        this.aktif = aktif;
        this.eklenmeTarihi = date.format(new Date(),'YYYY-MM-DD');
        this.durum = durum;
    }
}

module.exports = CihazObject;