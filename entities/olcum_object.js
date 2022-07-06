const date = require("date-and-time");

class OlcumObject{
    constructor(id, cihazId, isikSiddeti, sicaklik, karbondioksitMiktari, nem, gurultu,durum){
        this.id = id;
        this.cihazId = cihazId;
        this.isikSiddeti = isikSiddeti;
        this.sicaklik = sicaklik;
        this.karbondioksitMiktari = karbondioksitMiktari;
        this.nem = nem;
        this.gurultu = gurultu;
        this.eklenmeTarihi = date.format(new Date(),'YYYY-MM-DD');
        this.durum = durum;
    }
}

module.exports = OlcumObject;