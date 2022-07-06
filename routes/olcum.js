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


module.exports = router;
