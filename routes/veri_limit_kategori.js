var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const { response } = require('../app');
const VeriLimitKategoriService = require('../business/veri_limit_kategori_service');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     Veri_Limit_Kategori:
 *       type: object
 *       required:
 *         - adi
 *       properties:
 *         id:
 *           type: number
 *           description: Veri limit kategorisinin Id numarası. Otomatik oluşturulur.
 *         adi:
 *           type: string
 *           description: Veri limit kategorisinin adı.
 *         eklenmeTarihi:
 *           type: string
 *           description: Veri limit kategorisinin sisteme eklendiği tarih. Otomatik atanır.
 *         durum:
 *           type: boolean
 *           description: Veri limit kategorisinin aktif olup olmadığını gösteren alan. Otomatik atanır. 
 */

/**
 * @swagger
 * tags:
 *   name: limit_kategoriler
 *   description: Limit_Kategoriler
 */


/**
 * @swagger
 * /veri_limit_kategori/{userId}:
 *   get:
 *     summary: Tüm limit kategorileri döndürür
 *     tags: [limit_kategoriler]
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
    console.log("çalıştı");
    var service = new VeriLimitKategoriService();
    const response = await service.getAll(req.params.userId);
    res.send(response);
});


/**
 * @swagger
 * /veri_limit_kategori/{id}/{userId}:
 *   get:
 *     summary: Id'ye göre limit kategorileri getirir
 *     tags: [limit_kategoriler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Limit kategorisine ait Id numarası
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.get('/:id/:userId', async function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // res.send(req.params.id)
    var service = new VeriLimitKategoriService();
    var response = await service.getById(req.params.id, req.params.userId);
    res.send(response);
});


/**
 * @swagger
 * /veri_limit_kategori/{userId}:
 *   post:
 *      summary: Limit kategori tablosuna yeni limit ekle
 *      tags: [limit_kategoriler]
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
 *                  $ref: '#/components/schemas/Veri_Limit_Kategori'
 *      responses:
 *          200:
 *              description: Ekleme işlemi başarılı
 *          500: 
 *              description: Server hatası
 */
router.post("/:userId", urlencodedParser, async function (req, res, next) {
    var service = new VeriLimitKategoriService();
    const limitObj = {
        adi: req.body.adi,
    };

    var result = await service.add(limitObj, req.params.userId);
    res.send(result);
});


/**
 * @swagger
 * /veri_limit_kategori/{userId}:
 *   put:
 *      summary: Limit kategori tablosundaki bir limiti güncelle
 *      tags: [limit_kategoriler]
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
 *                  $ref: '#/components/schemas/Veri_Limit_Kategori'
 *      responses:
 *          200:
 *              description: Güncelleme işlemi başarılı
 *          500: 
 *              description: Server hatası
 */
router.put("/:userId", urlencodedParser, async function (req, res, next) {
    var service = new VeriLimitKategoriService();
    const limitObj = {
        id: req.body.id,
        adi: req.body.adi,
    };

    var result = await service.update(limitObj, req.params.userId);
    res.send(result);
});


/**
 * @swagger
 * /veri_limit_kategori/{id}/{userId}:
 *   delete:
 *     summary: Id numarasına göre limit kategorisinin durumunu false yap.
 *     tags: [limit_kategoriler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Limit kategorisine ait Id numarası
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: Veri başarıyla silindi
 */
router.delete("/:id/:userId", async function (req, res, next) {
    var service = new VeriLimitKategoriService();
    var result = await service.delete(req.params.id, req.params.userId);
    res.send(result);
})


module.exports = router;
