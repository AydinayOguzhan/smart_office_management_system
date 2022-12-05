var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const { response } = require('../app');
const OlcumService = require('../business/olcum_service');


var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     Olcum:
 *       type: object
 *       required:
 *         - cihaz_id
 *         - isik_siddeti
 *         - sicaklik
 *         - karbondioksit_miktari
 *         - nem
 *         - gurultu
 *         - meksis_kod
 *         - bina_id
 *         - kampus_id
 *       properties:
 *         id:
 *           type: string
 *           description: Ölçümün Id numarası. Otomatik oluşturulur.
 *         cihaz_id:
 *           type: number
 *           description: Ölçümün ait olduğu cihazın Id numarası.
 *         isik_siddeti:
 *           type: number
 *           description: Cihazın bulunduğu ortamdaki ışık şiddeti değeri.
 *         sicaklik:
 *           type: number
 *           description: Cihazın bulunduğu ortamdaki sıcaklık değeri.
 *         karbondioksit_miktari:
 *           type: number
 *           description: Cihazın bulunduğu ortamdaki karbondioksit miktarı değeri.
 *         nem:
 *           type: number
 *           description: Cihazın bulunduğu ortamdaki nem miktarı değeri.
 *         gurultu:
 *           type: number
 *           description: Cihazın bulunduğu bulunduğu ortamdaki gürültü miktarı değeri.
 *         eklenme_tarihi:
 *           type: string
 *           description: Ölçümün sisteme eklendiği tarih. Otomatik atanır.
 *         durum:
 *           type: boolean
 *           description: Verinin aktif olup olmadığını gösteren alan. Otomatik atanır. 
 *         meksis_kod:
 *           type: string
 *           description: Meksis kod.
 *         bina_id:
 *           type: string
 *           description: Cihazın bulunduğu binanın Id numarası.
 *         kampus_id:
 *           type: string
 *           description: Cihazın bulunduğu kampüsün Id numarası.
 */

/**
 * @swagger
 * tags:
 *   name: olcumler
 *   description: Olcumler
 */

/**
 * @swagger
 * /olcum/{email}:
 *   get:
 *     summary: Tüm ölçümleri getir
 *     tags: [olcumler]
 *     parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.get("/:email", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new OlcumService();
    const response = await service.getAll(req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /olcum/without_durum/{email}:
 *   get:
 *     summary: Sistemdeki silinmiş ölçümler dahil bütün ölçümleri getir
 *     tags: [olcumler]
 *     parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get("/without_durum/:email", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new OlcumService();
    const response = await service.getAllByWithoutDurum(req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /olcum/{id}/{email}:
 *   get:
 *     summary: Ölçümün Id numarasına göre ölçümü getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ölçüme ait Id numarası
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.get('/:id/:email', async function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // res.send(req.params.id)
    var service = new OlcumService();
    var response = await service.getById(req.params.id, req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /olcum/{email}:
 *   post:
 *      summary: Ölçümler tablosuna yeni ölçüm ekle
 *      tags: [olcumler]
 *      parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Olcum'
 *      responses:
 *          200:
 *              description: İşlem başarılı
 */
router.post("/:email", urlencodedParser, async function (req, res, next) {
    var service = new OlcumService();
    const olcumObj = {
        cihaz_id: req.body.cihaz_id,
        isik_siddeti: req.body.isik_siddeti,
        sicaklik: req.body.sicaklik,
        karbondioksit_miktari: req.body.karbondioksit_miktari,
        nem: req.body.nem,
        gurultu: req.body.gurultu,
        meksis_kod: req.body.meksis_kod,
        bina_id: req.body.bina_id,
        kampus_id: req.body.kampus_id
    };
    var result = await service.add(olcumObj, req.params.email);
    res.send(result);
});



/**
 * @swagger
 * /olcum/{id}/{email}:
 *   delete:
 *     summary: Ölçümü sil
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ölçüme ait Id numarası
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.delete("/:id/:email", async function (req, res, next) {
    var service = new OlcumService();
    var result = await service.delete(req.params.id, req.params.email);
    res.send(result);
})


/**
 * @swagger
 * /olcum/cihaz/{cihazId}/{email}:
 *   get:
 *     summary: Cihazın Id numarasına göre cihaza ait ölçümleri getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: cihazId
 *         schema:
 *           type: number
 *         required: true
 *         description: Cihazın Id numarası
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/cihaz/:cihazId/:email', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByCihazId(req.params.cihazId, req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /olcum/isikSiddeti/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa göre ışık şiddeti ölçümlerini getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Işık şiddetinin alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Işık şiddetinin üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/isikSiddeti/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByIsikSiddeti(req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /olcum/meksisIsikSiddeti/{meksis_kod}/{bina_id}/{kampus_id}/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa ve meksis koda göre ışık şiddeti ölçümlerini getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: meksis_kod
 *         schema:
 *           type: string
 *         required: true
 *         description: Meksis kod
 *       - in: path
 *         name: bina_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Binaya ait Id numarası
*       - in: path
 *         name: kampus_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kampüse ait Id numarası
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Işık şiddetinin alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Işık şiddetinin üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/meksisIsikSiddeti/:meksis_kod/:bina_id/:kampus_id/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByIsikSiddetiMeksis(req.params.meksis_kod, req.params.bina_id, req.params.kampus_id 
        ,req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /olcum/sicaklik/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa göre sıcaklık ölçümlerini getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Sıcaklığın alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Sıcaklığın üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/sicaklik/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllBySicaklik(req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /olcum/meksisSicaklik/{meksis_kod}/{bina_id}/{kampus_id}/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa ve meksis koda göre sıcaklık ölçümlerini getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: meksis_kod
 *         schema:
 *           type: string
 *         required: true
 *         description: Meksis kod
 *       - in: path
 *         name: bina_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Binaya ait Id numarası
 *       - in: path
 *         name: kampus_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kampüse ait Id numarası
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Sıcaklığın alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Sıcaklığın üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/meksisSicaklik/:meksis_kod/:bina_id/:kampus_id/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllBySicaklikMeksis(req.params.meksis_kod, req.params.bina_id, req.params.kampus_id,
        req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /olcum/karbondioksitMiktari/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa göre karbondioksit miktarı ölçümlerini getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Karbondioksit miktarının alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Karbondioksit miktarının üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/karbondioksitMiktari/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByKarbondioksitMiktari(req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /olcum/meksisKarbondioksitMiktari/{meksis_kod}/{bina_id}/{kampus_id}/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa ve meksis koda göre karbondioksit miktarı ölçümlerini getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: meksis_kod
 *         schema:
 *           type: string
 *         required: true
 *         description: Meksis kod
 *       - in: path
 *         name: bina_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Binaya ait Id numarası
 *       - in: path
 *         name: kampus_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kampüse ait Id numarası
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Karbondioksit miktarının alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Karbondioksit miktarının üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/meksisKarbondioksitMiktari/:meksis_kod/:bina_id/:kampus_id/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByKarbondioksitMiktariMeksis(req.params.meksis_kod, req.params.bina_id, req.params.kampus_id,
        req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /olcum/nem/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa göre nem ölçümlerini getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Nemin alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Nemin üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/nem/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByNem(req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /olcum/meksisNem/{meksis_kod}/{bina_id}/{kampus_id}/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa ve meksis koda göre nem ölçümlerini getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: meksis_kod
 *         schema:
 *           type: string
 *         required: true
 *         description: Meksis kod
 *       - in: path
 *         name: bina_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Binaya ait Id numarası
 *       - in: path
 *         name: kampus_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kampüse ait Id numarası
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Nemin alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Nemin üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/meksisNem/:meksis_kod/:bina_id/:kampus_id/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByNemMeksis(req.params.meksis_kod, req.params.bina_id, req.params.kampus_id,
        req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /olcum/gurultu/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa göre gürültü ölçümlerini getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Gürültünün alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Gürültünün üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/gurultu/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByGurultu(req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /olcum/meksisGurultu/{meksis_kod}/{bina_id}/{kampus_id}/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa ve meksis koda göre gürültü ölçümlerini getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: meksis_kod
 *         schema:
 *           type: string
 *         required: true
 *         description: Meksis kod
 *       - in: path
 *         name: bina_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Binaya ait Id numarası
 *       - in: path
 *         name: kampus_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kampüse ait Id numarası
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Gürültünün alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Gürültünün üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/meksisGurultu/:meksis_kod/:bina_id/:kampus_id/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByGurultuMeksis(req.params.meksis_kod, req.params.bina_id, req.params.kampus_id,
        req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /olcum/meksis/{meksis_kod}/{bina_id}/{kampus_id}/{email}:
 *   get:
 *     summary: Meksis koda göre ölçüm getirme
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: meksis_kod
 *         schema:
 *           type: string
 *         required: true
 *         description: Meksis kod
 *       - in: path
 *         name: bina_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Binaya ait Id numarası
 *       - in: path
 *         name: kampus_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Kampus ait Id numarası
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/meksis/:meksis_kod/:bina_id/:kampus_id/:email', async function (req, res, next) {
    var service = new OlcumService();
    // console.log("endpoint",req.params.meksis_kod, req.params.bina_id, req.params.kampus_id);
    var response = await service.getAllByMeksis(req.params.meksis_kod, req.params.bina_id, req.params.kampus_id, req.params.email);
    res.send(response);
});

module.exports = router;
