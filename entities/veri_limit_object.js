const date = require("date-and-time");

class VeriLimitObject{
    constructor(id, cihazId, kategoriId, adi,altLimit, ustLimit, yerId, durum){
        this.id = id;
        this.cihazId = cihazId;
        this.kategoriId = kategoriId;
        this.adi = adi;
        this.altLimit = altLimit;
        this.ustLimit = ustLimit;
        this.yerId = yerId;
        this.eklenmeTarihi = date.format(new Date(),'YYYY-MM-DD');
        this.durum = durum;        
    }
}

module.exports = VeriLimitObject;