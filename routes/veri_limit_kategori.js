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
 * /veri_limit_kategori/{email}:
 *   get:
 *     summary: Tüm veri limit kategorilerini getir
 *     tags: [limit_kategoriler]
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
    console.log("çalıştı");
    var service = new VeriLimitKategoriService();
    const response = await service.getAll(req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /veri_limit_kategori/without_durum/{email}:
 *   get:
 *     summary: Sistemdeki silinmiş veri limit kategorileri dahil bütün veri limit kategorileri getir
 *     tags: [limit_kategoriler]
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
    console.log("çalıştı");
    var service = new VeriLimitKategoriService();
    const response = await service.getAllByWithoutDurum(req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /veri_limit_kategori/{id}/{email}:
 *   get:
 *     summary: Veri limit kategori Id numarasına göre veri limit kategorisi getir
 *     tags: [limit_kategoriler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Limit kategorisine ait Id numarası
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
    var service = new VeriLimitKategoriService();
    var response = await service.getById(req.params.id, req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /veri_limit_kategori/{email}:
 *   post:
 *      summary: Yeni bir veri limit kategorisi ekle
 *      tags: [limit_kategoriler]
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
 *                  $ref: '#/components/schemas/Veri_Limit_Kategori'
 *      responses:
 *          200:
 *              description: İşlem başarılı
 */
router.post("/:email", urlencodedParser, async function (req, res, next) {
    var service = new VeriLimitKategoriService();
    const limitObj = {
        adi: req.body.adi,
    };

    var result = await service.add(limitObj, req.params.email);
    res.send(result);
});


/**
 * @swagger
 * /veri_limit_kategori/{email}:
 *   put:
 *      summary: Veri limit kategori tablosundaki bir veri limit kategorisini güncelle
 *      tags: [limit_kategoriler]
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
 *                  $ref: '#/components/schemas/Veri_Limit_Kategori'
 *      responses:
 *          200:
 *              description: İşlem başarılı
 */
router.put("/:email", urlencodedParser, async function (req, res, next) {
    var service = new VeriLimitKategoriService();
    const limitObj = {
        id: req.body.id,
        adi: req.body.adi,
    };

    var result = await service.update(limitObj, req.params.email);
    res.send(result);
});


/**
 * @swagger
 * /veri_limit_kategori/{id}/{email}:
 *   delete:
 *     summary: Veri limit kategorisi sil
 *     tags: [limit_kategoriler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Limit kategorisine ait Id numarası
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
    var service = new VeriLimitKategoriService();
    var result = await service.delete(req.params.id, req.params.email);
    res.send(result);
})


module.exports = router;
