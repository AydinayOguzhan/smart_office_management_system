var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const { response } = require('../app');
const VeriLimitService = require('../business/veri_limit_service');
const VeriLimitObject = require('../entities/veri_limit_object');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     Veri_Limit:
 *       type: object
 *       required:
 *         - adi
 *         - altLimit
 *         - ustLimit
 *         - yerId
 *       properties:
 *         id:
 *           type: number
 *           description: Veri limitinin Id numarası. Otomatik oluşturulur.
 *         adi:
 *           type: string
 *           description: Liminin adı.
 *         altLimit:
 *           type: string
 *           description: Alt limit değeri.
 *         ustLimit:
 *           type: string
 *           description: Üst limit değeri.
 *         yerId:
 *           type: number
 *           description: Limitin ait olduğu yerin Id numarası.
 *         eklenmeTarihi:
 *           type: string
 *           description: Limitin sisteme eklendiği tarih. Otomatik atanır.
 *         durum:
 *           type: boolean
 *           description: Limitin aktif olup olmadığını gösteren alan. Otomatik atanır. 
 */

/**
 * @swagger
 * tags:
 *   name: limitler
 *   description: Limitler
 */

/**
 * @swagger
 * /veri_limit/:
 *   get:
 *     summary: Tüm limitleri döndürür
 *     tags: [limitler]
 *     responses:
 *       200:
 *         description: Tüm data döner
 */
router.get("/", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new VeriLimitService();
    const response = await service.getAll();
    res.send(response);
});


/**
 * @swagger
 * /veri_limit/{id}:
 *   get:
 *     summary: Id'ye göre limitleri getir
 *     tags: [limitler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Limite ait Id numarası
 *     responses:
 *       200:
 *         description: Gerekli data gelir
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veri_Limit'
 *       404:
 *         description: Data bulunamadı
 */
router.get('/:id', async function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // res.send(req.params.id)
    var service = new VeriLimitService();
    var response = await service.getById(req.params.id);
    res.send(response);
});


/**
 * @swagger
 * /veri_limit/:
 *   post:
 *     summary: Limitler tablosuna yeni cihaz ekle
 *     tags: [limitler]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               $ref: '#/components/schemas/Veri_Limit'
 *     responses:
 *       200:
 *         description: Yeni cihaz başarıyla eklendi
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Veri_Limit'
 *       500:
 *         description: Server hatası
 */
router.post("/", urlencodedParser, async function (req, res, next) {
    var service = new VeriLimitService();
    const limitObj = new VeriLimitObject();
    limitObj.adi = req.body.adi;
    limitObj.altLimit = req.body.altLimit;
    limitObj.ustLimit = req.body.ustLimit;
    limitObj.yerId = req.body.yerId;

    var result = await service.add(limitObj);
    res.send(result);
});


/**
 * @swagger
 * /veri_limit/:
 *   put:
 *     summary: Id numarasına göre limitleri güncelle
 *     tags: [limitler]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               $ref: '#/components/schemas/Veri_Limit'
 *     responses:
 *       200:
 *         description: Data başarıyla güncellendi
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Veri_Limit'
 *       500:
 *         description: Server hatası
 */
router.put("/", urlencodedParser, async function (req, res, next) {
    var service = new VeriLimitService();
    const limitObj = new VeriLimitObject();
    limitObj.id = req.body.id;
    limitObj.adi = req.body.adi;
    limitObj.altLimit = req.body.altLimit;
    limitObj.ustLimit = req.body.ustLimit;
    limitObj.yerId = req.body.yerId;

    var result = await service.update(limitObj);
    res.send(result);
});


/**
 * @swagger
 * /veri_limit/{id}:
 *   delete:
 *     summary: Id numarasına göre limitin durumunu false yap.
 *     tags: [limitler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Limite ait Id numarası
 *     responses:
 *       200:
 *         description: Veri başarıyla silindi
 *       404:
 *         description: Veri bulunamadı
 */
router.delete("/:id", async function (req, res, next) {
    var service = new VeriLimitService();
    var result = await service.delete(req.params.id);
    res.send(result);
})


module.exports = router;
