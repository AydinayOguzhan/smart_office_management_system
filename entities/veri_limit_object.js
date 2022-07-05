const date = require("date-and-time");

class VeriLimitObject{
    constructor(id, adi,altLimit, ustLimit, yerId, durum){
        this.id = id;
        this.adi = adi;
        this.altLimit = altLimit;
        this.ustLimit = ustLimit;
        this.yerId = yerId;
        this.eklenmeTarihi = date.format(new Date(),'YYYY-MM-DD');
        this.durum = durum;        
    }
}

module.exports = VeriLimitObject;