const date = require("date-and-time");

class ParcaObject{
    constructor(id,cihazId, kategoriId,parcaAdi,durum){
        this.id = id;
        this.cihazId = cihazId;
        this.kategoriId = kategoriId;
        this.parcaAdi = parcaAdi;
        this.eklenmeTarihi = date.format(new Date(),'YYYY-MM-DD');
        this.durum = durum;
    }
}

module.exports = ParcaObject;