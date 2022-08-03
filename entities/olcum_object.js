const date = require("date-and-time");

class OlcumObject{
    constructor(id, cihaz_id, isik_siddeti, sicaklik, karbondioksit_miktari, nem, gurultu,durum){
        this.id = id;
        this.cihaz_id = cihaz_id;
        this.isik_siddeti = isik_siddeti;
        this.sicaklik = sicaklik;
        this.karbondioksit_miktari = karbondioksit_miktari;
        this.nem = nem;
        this.gurultu = gurultu;
        this.eklenmeTarihi = date.format(new Date(),'YYYY-MM-DD');
        this.durum = durum;
    }
}

module.exports = OlcumObject;