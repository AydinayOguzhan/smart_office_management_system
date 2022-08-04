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
 * /veri_limit/{userId}:
 *   get:
 *     summary: Tüm limitleri döndürür
 *     tags: [limitler]
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
    var service = new VeriLimitService();
    const response = await service.getAll(req.params.userId);
    res.send(response);
});


/**
 * @swagger
 * /veri_limit/{id}/{userId}:
 *   get:
 *     summary: Id'ye göre limitleri getirir
 *     tags: [limitler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Limite ait Id numarası
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: Gerekli data gelir
 */
router.get('/:id/:userId', async function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // res.send(req.params.id)
    var service = new VeriLimitService();
    var response = await service.getById(req.params.id, req.params.userId);
    res.send(response);
});


/**
 * @swagger
 * /veri_limit/{userId}:
 *   post:
 *      summary: Limitler tablosuna yeni limit ekle
 *      tags: [limitler]
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
 *                  $ref: '#/components/schemas/Veri_Limit'
 *      responses:
 *          200:
 *              description: Ekleme işlemi başarılı
 *          500: 
 *              description: Server hatası
 */
router.post("/:userId", urlencodedParser, async function (req, res, next) {
    var service = new VeriLimitService();
    const limitObj = new VeriLimitObject();
    limitObj.adi = req.body.adi;
    limitObj.altLimit = req.body.altLimit;
    limitObj.ustLimit = req.body.ustLimit;
    limitObj.yerId = req.body.yerId;

    var result = await service.add(limitObj, req.params.userId);
    res.send(result);
});


/**
 * @swagger
 * /veri_limit/{userId}:
 *   put:
 *      summary: Limitler tablosundaki bir limiti güncelle
 *      tags: [limitler]
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
 *                  $ref: '#/components/schemas/Veri_Limit'
 *      responses:
 *          200:
 *              description: Güncelleme işlemi başarılı
 *          500: 
 *              description: Server hatası
 */
router.put("/:userId", urlencodedParser, async function (req, res, next) {
    var service = new VeriLimitService();
    const limitObj = new VeriLimitObject();
    limitObj.id = req.body.id;
    limitObj.adi = req.body.adi;
    limitObj.altLimit = req.body.altLimit;
    limitObj.ustLimit = req.body.ustLimit;
    limitObj.yerId = req.body.yerId;

    var result = await service.update(limitObj, req.params.userId);
    res.send(result);
});


/**
 * @swagger
 * /veri_limit/{id}/{userId}:
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
    var service = new VeriLimitService();
    var result = await service.delete(req.params.id, req.params.userId);
    res.send(result);
})


module.exports = router;
