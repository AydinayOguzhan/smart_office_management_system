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
 *         - cihaz_id
 *         - isik_siddeti
 *         - sicaklik
 *         - karbondioksit_miktari
 *         - nem
 *         - gurultu
 *       properties:
 *         id:
 *           type: number
 *           description: Ölçümün Id numarası. Otomatik oluşturulur.
 *         cihaz_id:
 *           type: number
 *           description: Ölçümün ait olduğu cihazın Id numarası.
 *         isik_siddeti:
 *           type: string
 *           description: Cihazın bulunduğu ortamdaki ışık şiddeti değeri.
 *         sicaklik:
 *           type: string
 *           description: Cihazın bulunduğu ortamdaki sıcaklık değeri.
 *         karbondioksit_miktari:
 *           type: string
 *           description: Cihazın bulunduğu ortamdaki karbondioksit miktarı değeri.
 *         nem:
 *           type: string
 *           description: Cihazın bulunduğu ortamdaki nem miktarı değeri.
 *         gurultu:
 *           type: string
 *           description: Cihazın bulunduğu bulunduğu ortamdaki gürültü miktarı değeri.
 *         eklenme_tarihi:
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
 * /olcum/{userId}:
 *   get:
 *     summary: Tüm ölçümleri döndürür
 *     tags: [olcumler]
 *     parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: number
 *        required: true
 *        description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: Tüm data döner
 */
router.get("/:userId", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new OlcumService();
    const response = await service.getAll(req.params.userId);
    res.send(response);
});


/**
 * @swagger
 * /olcum/{id}/{userId}:
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
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
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
router.get('/:id/:userId', async function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // res.send(req.params.id)
    var service = new OlcumService();
    var response = await service.getById(req.params.id, req.params.userId);
    res.send(response);
});


/**
 * @swagger
 * /olcum/{userId}:
 *   post:
 *      summary: Ölçümler tablosuna yeni cihaz ekle
 *      tags: [olcumler]
 *      parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Olcum'
 *      responses:
 *          200:
 *              description: Ekleme işlemi başarılı
 *          500: 
 *              description: Server hatası
 */
router.post("/:userId", urlencodedParser, async function (req, res, next) {
    var service = new OlcumService();
    const olcumObj = new OlcumObject();
    olcumObj.cihaz_id = req.body.cihaz_id;
    olcumObj.isik_siddeti = req.body.isik_siddeti;
    olcumObj.sicaklik = req.body.sicaklik;
    olcumObj.karbondioksit_miktari = req.body.karbondioksit_miktari;
    olcumObj.nem = req.body.nem;
    olcumObj.gurultu = req.body.gurultu;

    var result = await service.add(olcumObj, req.params.userId);
    res.send(result);
});


/**
 * @swagger
 * /olcum/{userId}:
 *   put:
 *      summary: Ölçümler tablosuna yeni cihaz ekle
 *      tags: [olcumler]
 *      parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Olcum'
 *      responses:
 *          200:
 *              description: Ekleme işlemi başarılı
 *          500: 
 *              description: Server hatası
 */
router.put("/:userId", urlencodedParser, async function (req, res, next) {
    var service = new OlcumService();
    const olcumObj = new OlcumObject();
    olcumObj.id = req.body.id;
    olcumObj.cihaz_id = req.body.cihaz_id;
    olcumObj.isik_siddeti = req.body.isik_siddeti;
    olcumObj.sicaklik = req.body.sicaklik;
    olcumObj.karbondioksit_miktari = req.body.karbondioksit_miktari;
    olcumObj.nem = req.body.nem;
    olcumObj.gurultu = req.body.gurultu;

    var result = await service.update(olcumObj, req.params.userId);
    res.send(result);
});


/**
 * @swagger
 * /olcum/{id}/{userId}:
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
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: Veri başarıyla silindi
 *       404:
 *         description: Veri bulunamadı
 */
router.delete("/:id/:userId", async function (req, res, next) {
    var service = new OlcumService();
    var result = await service.delete(req.params.id, req.params.userId);
    res.send(result);
})

/**
 * @swagger
 * /olcum/durum/{durum}/{userId}:
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
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
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
 router.get('/durum/:durum/:userId', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByDurum(req.params.durum, req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /olcum/cihaz/{cihazId}/{userId}:
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
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
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
 router.get('/cihaz/:cihazId/:userId', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByCihazId(req.params.cihazId, req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /olcum/isikSiddeti/{loverLimit}/{upperLimit}/{userId}:
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
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
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
 router.get('/isikSiddeti/:loverLimit/:upperLimit/:userId', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByIsikSiddeti(req.params.loverLimit, req.params.upperLimit, req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /olcum/sicaklik/{loverLimit}/{upperLimit}/{userId}:
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
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
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
 router.get('/sicaklik/:loverLimit/:upperLimit/:userId', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllBySicaklik(req.params.loverLimit, req.params.upperLimit, req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /olcum/karbondioksitMiktari/{loverLimit}/{upperLimit}/{userId}:
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
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
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
 router.get('/karbondioksitMiktari/:loverLimit/:upperLimit/:userId', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByKarbondioksitMiktari(req.params.loverLimit, req.params.upperLimit, req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /olcum/nem/{loverLimit}/{upperLimit}/{userId}:
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
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
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
 router.get('/nem/:loverLimit/:upperLimit/:userId', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByNem(req.params.loverLimit, req.params.upperLimit, req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /olcum/gurultu/{loverLimit}/{upperLimit}/{userId}:
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
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
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
 router.get('/gurultu/:loverLimit/:upperLimit/:userId', async function (req, res, next) {
    var service = new OlcumService();
    var response = await service.getAllByGurultu(req.params.loverLimit, req.params.upperLimit, req.params.userId);
    res.send(response);
});

module.exports = router;
