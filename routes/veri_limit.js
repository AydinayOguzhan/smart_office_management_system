var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
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
 * /veri_limit/{email}:
 *   get:
 *     summary: Tüm veri limitlerini getir
 *     tags: [limitler]
 *     parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: string
 *        required: true
 *        description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: Tüm data döner
 */
router.get("/:email", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new VeriLimitService();
    const response = await service.getAll(req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /veri_limit/without_durum/{email}:
 *   get:
 *     summary: Sistemdeki silinmiş veri limitleri dahil bütün veri limitlerini getir
 *     tags: [limitler]
 *     parameters:
 *      - in: path
 *        name: email
 *        schema:
 *          type: number
 *        required: true
 *        description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get("/without_durum/:email", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new VeriLimitService();
    const response = await service.getAllByWithoutDurum(req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /veri_limit/cihaz/{cihazId}/{email}:
 *   get:
 *     summary: Cihazın Id numarasına göre veri limitlerini getir
 *     tags: [limitler]
 *     parameters:
 *      - in: path
 *        name: cihazId
 *        schema:
 *          type: number
 *        required: true
 *        description: Cihaza ait Id numarası
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
 router.get("/cihaz/:cihazId/:email", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new VeriLimitService();
    const response = await service.getAllByCihazId(req.params.cihazId, req.params.email);
    res.send(response);
});



/**
 * @swagger
 * /veri_limit/kategori/{kategoriId}/{email}:
 *   get:
 *     summary: Kategori Id numarasına göre tüm veri limitlerini getir
 *     tags: [limitler]
 *     parameters:
 *      - in: path
 *        name: kategoriId
 *        schema:
 *          type: number
 *        required: true
 *        description: Limitin kategorisine ait Id numarası
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
 router.get("/kategori/:kategoriId/:email", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new VeriLimitService();
    const response = await service.getAllByKategoriId(req.params.kategoriId, req.params.email);
    res.send(response);
});



/**
 * @swagger
 * /veri_limit/{id}/{email}:
 *   get:
 *     summary: Veri limiti Id numarasına göre veri limiti getir
 *     tags: [limitler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Limite ait Id numarası
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
    var service = new VeriLimitService();
    var response = await service.getById(req.params.id, req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /veri_limit/{email}:
 *   post:
 *      summary: Yeni bir veri limiti ekle
 *      tags: [limitler]
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
 *                  $ref: '#/components/schemas/Veri_Limit'
 *      responses:
 *          200:
 *              description: İşlem başarılı
 */
router.post("/:email", urlencodedParser, async function (req, res, next) {
    var service = new VeriLimitService();
    const limitObj = {
        cihazId: req.body.cihazId,
        kategoriId: req.body.kategoriId,
        adi: req.body.adi,
        altLimit: req.body.altLimit,
        ustLimit: req.body.ustLimit,
    };

    var result = await service.add(limitObj, req.params.email);
    res.send(result);
});


/**
 * @swagger
 * /veri_limit/{email}:
 *   put:
 *      summary: Veri limitleri tablosundaki bir veri limitini güncelle
 *      tags: [limitler]
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
 *                  $ref: '#/components/schemas/Veri_Limit'
 *      responses:
 *          200:
 *              description: İşlem başarılı
 */
router.put("/:email", urlencodedParser, async function (req, res, next) {
    var service = new VeriLimitService();
    const limitObj = {
        id: req.body.id,
        cihazId: req.body.cihazId,
        kategoriId: req.body.kategoriId,
        adi: req.body.adi,
        altLimit: req.body.altLimit,
        ustLimit: req.body.ustLimit,
    };

    var result = await service.update(limitObj, req.params.email);
    res.send(result);
});


/**
 * @swagger
 * /veri_limit/{id}/{email}:
 *   delete:
 *     summary: Veri limiti sil
 *     tags: [limitler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Limite ait Id numarası
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
    var service = new VeriLimitService();
    var result = await service.delete(req.params.id, req.params.email);
    res.send(result);
})


module.exports = router;
