var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const { response } = require('../app');
const CihazlarService = require('../business/cihazlar_service');
const ErrorResult = require('../core/utilities/results/error_result');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * @swagger
 * components:
 *   schemas:
 *     Cihaz:
 *       type: object
 *       required:
 *         - adi
 *         - kat
 *         - mekan_id
 *         - bina_id
 *         - kampus_id
 *       properties:
 *         id:
 *           type: number
 *           description: Cihazın Id numarası. Otomatik oluşturulur.
 *         adi:
 *           type: string
 *           description: Cihazın adı.
 *         kat:
 *           type: number
 *           description: Cihazın bulunduğu kat.
 *         mekan_id:
 *           type: number
 *           description: Cihazın bulunduğu mekanın Id numarası.
 *         bina_id:
 *           type: number
 *           description: Cihazın bulunduğu binanın Id numarası.
 *         kampus_id:
 *           type: number
 *           description: Cihazın bulunduğu kampüsün Id numarası.
 *         universite_id:
 *           type: number
 *           description: Cihazın bulunduğu üniversitenin Id numarası. Otomatik atanır.
 *         veri_gonderme_sikligi:
 *           type: number
 *           description: Cihazın veri gönderme sıklığı. Saniye cinsinden.
 *         aktif:
 *           type: boolean
 *           description: Cihazın çalışıp çalışmadığını gösteren alan.
 *         eklenme_tarihi:
 *           type: string
 *           description: Cihazın sisteme eklendiği tarih. Otomatik atanır.
 *         durum:
 *           type: boolean
 *           description: Verinin aktif olup olmadığını gösteren alan. Otomatik atanır. 
 */

/**
 * @swagger
 * tags:
 *   name: cihazlar
 *   description: Cihazlar
 */

/**
 * @swagger
 * /cihaz/{userId}:
 *   get:
 *     summary: Tüm cihazları döndürür
 *     tags: [cihazlar]
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
    var service = new CihazlarService();
    const response = await service.getAll(req.params.userId);
    res.send(response);
});


/**
 * @swagger
 * /cihaz/id/{id}/{userId}:
 *   get:
 *     summary: Id'ye göre cihazı getir
 *     tags: [cihazlar]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Cihaza ait Id numarası
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
 *               $ref: '#/components/schemas/Cihaz'
 *       404:
 *         description: Data bulunamadı 
 */
router.get('/id/:id/:userId', async function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // res.send(req.params.id)
    var service = new CihazlarService();
    var response = await service.getById(req.params.id, req.params.userId);
    res.send(response);
});



/**
 * @swagger
 * /cihaz/{userId}:
 *   post:
 *      summary: Cihazlar tablosuna yeni cihaz ekle
 *      tags: [cihazlar]
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
 *                  $ref: '#/components/schemas/Cihaz'
 *      responses:
 *          200:
 *              description: Ekleme işlemi başarılı
 *          500: 
 *              description: Server hatası
 */
router.post("/:userId", urlencodedParser, async function (req, res, next) {
    var service = new CihazlarService();
    const cihazObj = {
        adi: req.body.adi,
        kat: req.body.kat,
        mekanId: req.body.mekan_id,
        binaId: req.body.bina_id,
        kampusId: req.body.kampus_id,
        veriGondermeSikligi: req.body.veri_gonderme_sikligi,
    };

    var result = await service.add(cihazObj, req.params.userId);
    res.send(result);
});


/**
 * @swagger
 * /cihaz/{userId}:
 *   put:
 *     summary: Id numarasına göre cihazları güncelle
 *     tags: [cihazlar]
 *     parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: number
 *        required: true
 *        description: Kullanıcıya ait Id numarası
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Cihaz'
 *     responses:
 *       200:
 *         description: Data başarıyla güncellendi
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Cihaz'
 *       500:
 *         description: Server hatası
 */
router.put("/:userId", urlencodedParser, async function (req, res, next) {
    var service = new CihazlarService();
    const cihazObj = {
        id: req.body.id,
        adi: req.body.adi,
        kat: req.body.kat,
        mekanId: req.body.mekan_id,
        binaId: req.body.bina_id,
        kampusId: req.body.kampus_id,
        veriGondermeSikligi: req.body.veri_gonderme_sikligi,
        aktif: req.body.aktif,
    };

    var result = await service.update(cihazObj, req.params.userId);
    res.send(result);
});


/**
 * @swagger
 * /cihaz/{id}/{userId}:
 *   delete:
 *     summary: Id numarasına göre verinin durumunu false yap.
 *     tags: [cihazlar]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Cihaza ait Id numarası
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
    var service = new CihazlarService();
    var result = await service.delete(req.params.id, req.params.userId);
    res.send(result);
})


/**
 * @swagger
 * /cihaz/mekan/{mekanId}/{userId}:
 *   get:
 *     summary: Tüm cihazları bulundukları mekana göre döndürür
 *     tags: [cihazlar]
 *     parameters:
 *      - in: path
 *        name: mekanId
 *        schema:
 *          type: number
 *        required: true
 *        description: Cihazın bulunduğu mekana ait Id numarası
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
router.get("/mekan/:mekanId/:userId", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.getAllByMekan(req.params.mekanId, req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /cihaz/bina/{binaId}/{userId}:
 *   get:
 *     summary: Tüm cihazları bulundukları binaya göre döndürür
 *     tags: [cihazlar]
 *     parameters:
 *      - in: path
 *        name: binaId
 *        schema:
 *          type: number
 *        required: true
 *        description: Cihazın bulunduğu binaya ait Id numarası
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
router.get("/bina/:binaId/:userId", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.getAllByBina(req.params.binaId, req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /cihaz/kampus/{kampusId}/{userId}:
 *   get:
 *     summary: Tüm cihazları bulundukları kampüse göre döndürür
 *     tags: [cihazlar]
 *     parameters:
 *      - in: path
 *        name: kampusId
 *        schema:
 *          type: number
 *        required: false
 *        description: Cihazın bulunduğu kampüse ait Id numarası
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
router.get("/kampus/:kampusId/:userId", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.getAllByKampus(req.params.kampusId, req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /cihaz/aktif/{aktif}/{userId}:
 *   get:
 *     summary: Tüm cihazları aktifliklerine göre getirir
 *     tags: [cihazlar]
 *     parameters:
 *      - in: path
 *        name: aktif
 *        schema:
 *          type: boolean
 *        required: false
 *        description: Cihazın aktiflik durumu. 1-Aktif 2-Deaktif
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
router.get("/aktif/:aktif/:userId", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.getAllByAktif(req.params.aktif, req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /cihaz/durum/{durum}/{userId}:
 *   get:
 *     summary: Tüm cihazları veri aktifliğine göre getirir
 *     tags: [cihazlar]
 *     parameters:
 *      - in: path
 *        name: durum
 *        schema:
 *          type: boolean
 *        required: false
 *        description: Cihazın durumu. 1-Aktif 2-Deaktif
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
router.get("/durum/:durum/:userId", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.getAllByDurum(req.params.durum, req.params.userId);
    res.send(response);
});

module.exports = router;
