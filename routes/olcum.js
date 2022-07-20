var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const { response } = require('../app');
const OlcumService = require('../business/olcum_service');
const OlcumObject = require('../entities/olcum_object');


var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     Olcum:
 *       type: object
 *       required:
 *         - cihazId
 *         - isikSiddeti
 *         - sicaklik
 *         - karbondioksitMiktari
 *         - nem
 *         - gurultu
 *       properties:
 *         id:
 *           type: number
 *           description: Ölçümün Id numarası. Otomatik oluşturulur.
 *         cihazId:
 *           type: number
 *           description: Ölçümün ait olduğu cihazın Id numarası.
 *         isikSiddeti:
 *           type: string
 *           description: Cihazın bulunduğu ortamdaki ışık şiddeti değeri.
 *         sicaklik:
 *           type: string
 *           description: Cihazın bulunduğu ortamdaki sıcaklık değeri.
 *         karbondioksitMiktari:
 *           type: string
 *           description: Cihazın bulunduğu ortamdaki karbondioksit miktarı değeri.
 *         nem:
 *           type: string
 *           description: Cihazın bulunduğu ortamdaki nem miktarı değeri.
 *         gurultu:
 *           type: string
 *           description: Cihazın bulunduğu bulunduğu ortamdaki gürültü miktarı değeri.
 *         eklenmeTarihi:
 *           type: string
 *           description: Ölçümün sisteme eklendiği tarih. Otomatik atanır.
 *         durum:
 *           type: boolean
 *           description: Verinin aktif olup olmadığını gösteren alan. Otomatik atanır. 
 */

/**
 * @swagger
 * tags:
 *   name: olcumler
 *   description: Olcumler
 */

/**
 * @swagger
 * /olcum/:
 *   get:
 *     summary: Tüm ölçümleri döndürür
 *     tags: [olcumler]
 *     responses:
 *       200:
 *         description: Tüm data döner
 */
router.get("/", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new OlcumService();
    const response = await service.getAll();
    res.send(response);
});


/**
 * @swagger
 * /olcum/{id}:
 *   get:
 *     summary: Id'ye göre ölçümü getir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Ölçüme ait Id numarası
 *     responses:
 *       200:
 *         description: Gerekli data gelir
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Olcum'
 *       404:
 *         description: Data bulunamadı
 */
router.get('/:id', async function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // res.send(req.params.id)
    var service = new OlcumService();
    var response = await service.getById(req.params.id);
    res.send(response);
});


/**
 * @swagger
 * /olcum/:
 *   post:
 *     summary: Ölçümler tablosuna yeni ölçüm ekle
 *     tags: [olcumler]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               $ref: '#/components/schemas/Olcum'
 *     responses:
 *       200:
 *         description: Yeni ölçüm başarıyla eklendi
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Olcum'
 *       500:
 *         description: Server hatası
 */
router.post("/", urlencodedParser, async function (req, res, next) {
    var service = new OlcumService();
    const olcumObj = new OlcumObject();
    olcumObj.cihazId = req.body.cihazId;
    olcumObj.isikSiddeti = req.body.isikSiddeti;
    olcumObj.sicaklik = req.body.sicaklik;
    olcumObj.karbondioksitMiktari = req.body.karbondioksitMiktari;
    olcumObj.nem = req.body.nem;
    olcumObj.gurultu = req.body.gurultu;

    var result = await service.add(olcumObj);
    res.send(result);
});


/**
 * @swagger
 * /olcum/:
 *   put:
 *     summary: Id numarasına göre ölçümleri güncelle
 *     tags: [olcumler]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               $ref: '#/components/schemas/Olcum'
 *     responses:
 *       200:
 *         description: Data başarıyla güncellendi
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Olcum'
 *       500:
 *         description: Server hatası
 */
router.put("/", urlencodedParser, async function (req, res, next) {
    var service = new OlcumService();
    const olcumObj = new OlcumObject();
    olcumObj.id = req.body.id;
    olcumObj.cihazId = req.body.cihazId;
    olcumObj.isikSiddeti = req.body.isikSiddeti;
    olcumObj.sicaklik = req.body.sicaklik;
    olcumObj.karbondioksitMiktari = req.body.karbondioksitMiktari;
    olcumObj.nem = req.body.nem;
    olcumObj.gurultu = req.body.gurultu;

    var result = await service.update(olcumObj);
    res.send(result);
});


/**
 * @swagger
 * /olcum/{id}:
 *   delete:
 *     summary: Id numarasına göre verinin durumunu false yap.
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Ölçüme ait Id numarası
 *     responses:
 *       200:
 *         description: Veri başarıyla silindi
 *       404:
 *         description: Veri bulunamadı
 */
router.delete("/:id", async function (req, res, next) {
    var service = new OlcumService();
    var result = await service.delete(req.params.id);
    res.send(result);
})

/**
 * @swagger
 * /olcum/durum/{durum}:
 *   get:
 *     summary: Verinin aktiflik durumuna göre getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: durum
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Aktiflik durumu. 1-Aktif 2-Deaktif
 *     responses:
 *       200:
 *         description: Ölçümler gelir
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Olcum'
 *       404:
 *         description: Data bulunamadı
 */
 router.get('/durum/:durum', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByDurum(req.params.durum);
    res.send(response);
});

/**
 * @swagger
 * /olcum/cihaz/{cihazId}:
 *   get:
 *     summary: Cihaza göre verileri getirir
 *     tags: [olcumler]
 *     parameters:
 *       - in: path
 *         name: cihazId
 *         schema:
 *           type: number
 *         required: true
 *         description: Cihazın Id numarası
 *     responses:
 *       200:
 *         description: Ölçümler gelir
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Olcum'
 *       404:
 *         description: Data bulunamadı
 */
 router.get('/cihaz/:cihazId', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByCihazId(req.params.cihazId);
    res.send(response);
});

/**
 * @swagger
 * /olcum/isikSiddeti/{loverLimit}/{upperLimit}:
 *   get:
 *     summary: Işık şiddeti belirlenen aralığa giren ölçümleri gelir
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
 *     responses:
 *       200:
 *         description: Ölçümler gelir
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Olcum'
 *       404:
 *         description: Data bulunamadı
 */
 router.get('/isikSiddeti/:loverLimit/:upperLimit', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByIsikSiddeti(req.params.loverLimit, req.params.upperLimit);
    res.send(response);
});

/**
 * @swagger
 * /olcum/sicaklik/{loverLimit}/{upperLimit}:
 *   get:
 *     summary: Sıcaklık belirlenen aralığa giren ölçümleri gelir
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
 *     responses:
 *       200:
 *         description: Ölçümler gelir
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Olcum'
 *       404:
 *         description: Data bulunamadı
 */
 router.get('/sicaklik/:loverLimit/:upperLimit', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllBySicaklik(req.params.loverLimit, req.params.upperLimit);
    res.send(response);
});

/**
 * @swagger
 * /olcum/karbondioksitMiktari/{loverLimit}/{upperLimit}:
 *   get:
 *     summary: Karbondioksit miktari belirlenen aralığa giren ölçümleri getirir
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
 *     responses:
 *       200:
 *         description: Ölçümler gelir
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Olcum'
 *       404:
 *         description: Data bulunamadı
 */
 router.get('/karbondioksitMiktari/:loverLimit/:upperLimit', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByKarbondioksitMiktari(req.params.loverLimit, req.params.upperLimit);
    res.send(response);
});

/**
 * @swagger
 * /olcum/nem/{loverLimit}/{upperLimit}:
 *   get:
 *     summary: Nem belirlenen aralığa giren ölçümleri gelir
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
 *     responses:
 *       200:
 *         description: Ölçümler gelir
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Olcum'
 *       404:
 *         description: Data bulunamadı
 */
 router.get('/nem/:loverLimit/:upperLimit', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByNem(req.params.loverLimit, req.params.upperLimit);
    res.send(response);
});

/**
 * @swagger
 * /olcum/gurultu/{loverLimit}/{upperLimit}:
 *   get:
 *     summary: Gürültü belirlenen aralığa giren ölçümleri gelir
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
 *     responses:
 *       200:
 *         description: Ölçümler gelir
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Olcum'
 *       404:
 *         description: Data bulunamadı
 */
 router.get('/gurultu/:loverLimit/:upperLimit', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByGurultu(req.params.loverLimit, req.params.upperLimit);
    res.send(response);
});

module.exports = router;
