var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const { response } = require('../app');
const VeriLimitService = require('../business/veri_limit_service');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     Veri_Limit:
 *       type: object
 *       required:
 *         - cihazId
 *         - kategoriId
 *         - adi
 *         - altLimit
 *         - ustLimit
 *       properties:
 *         id:
 *           type: number
 *           description: Veri limitinin Id numarası. Otomatik oluşturulur.
 *         cihazId:
 *           type: number
 *           description: Veri limitinin ait olduğu cihazın Id numarası.
 *         kategoriId:
 *           type: number
 *           description: Veri limitinin ait olduğu kategoriye ait Id numarası.
 *         adi:
 *           type: string
 *           description: Liminin adı.
 *         altLimit:
 *           type: string
 *           description: Alt limit değeri.
 *         ustLimit:
 *           type: string
 *           description: Üst limit değeri.
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
 * /veri_limit/without_durum/{userId}:
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
 router.get("/without_durum/:userId", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new VeriLimitService();
    const response = await service.getAllByWithoutDurum(req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /veri_limit/cihaz/{cihazId}/{userId}:
 *   get:
 *     summary: Tüm limitleri döndürür
 *     tags: [limitler]
 *     parameters:
 *      - in: path
 *        name: cihazId
 *        schema:
 *          type: number
 *        required: true
 *        description: Cihaza ait Id numarası
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
 router.get("/cihaz/:cihazId/:userId", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new VeriLimitService();
    const response = await service.getAllByCihazId(req.params.cihazId, req.params.userId);
    res.send(response);
});



/**
 * @swagger
 * /veri_limit/kategori/{kategoriId}/{userId}:
 *   get:
 *     summary: Tüm limitleri kategori alanına göre döndürür
 *     tags: [limitler]
 *     parameters:
 *      - in: path
 *        name: kategoriId
 *        schema:
 *          type: number
 *        required: true
 *        description: Limitin kategorisine ait Id numarası
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
 router.get("/kategori/:kategoriId/:userId", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new VeriLimitService();
    const response = await service.getAllByKategoriId(req.params.kategoriId, req.params.userId);
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
    const limitObj = {
        cihazId: req.body.cihazId,
        kategoriId: req.body.kategoriId,
        adi: req.body.adi,
        altLimit: req.body.altLimit,
        ustLimit: req.body.ustLimit,
    };

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
    const limitObj = {
        id: req.body.id,
        cihazId: req.body.cihazId,
        kategoriId: req.body.kategoriId,
        adi: req.body.adi,
        altLimit: req.body.altLimit,
        ustLimit: req.body.ustLimit,
    };

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
