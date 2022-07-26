var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const { response } = require('../app');
const CihazlarService = require('../business/cihazlar_service');
const CihazObject = require('../entities/cihaz_object');
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
 *         - mekanId
 *         - binaId
 *         - kampusId
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
 *         mekanId:
 *           type: number
 *           description: Cihazın bulunduğu mekanın Id numarası.
 *         binaId:
 *           type: number
 *           description: Cihazın bulunduğu binanın Id numarası.
 *         kampusId:
 *           type: number
 *           description: Cihazın bulunduğu kampüsün Id numarası.
 *         universiteId:
 *           type: number
 *           description: Cihazın bulunduğu üniversitenin Id numarası. Otomatik atanır.
 *         veriGondermeSikligi:
 *           type: number
 *           description: Cihazın veri gönderme sıklığı. Saniye cinsinden.
 *         aktif:
 *           type: boolean
 *           description: Cihazın çalışıp çalışmadığını gösteren alan.
 *         eklenmeTarihi:
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
 *        description: Cihaza ait Id numarası
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
 * /cihaz/id/{id}:
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
router.get('/id/:id', async function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // res.send(req.params.id)
    var service = new CihazlarService();
    var response = await service.getById(req.params.id);
    res.send(response);
});


/**
 * @swagger
 * /cihaz/:
 *   post:
 *     summary: Cihazlar tablosuna yeni cihaz ekle
 *     tags: [cihazlar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               $ref: '#/components/schemas/Cihaz'
 *     responses:
 *       200:
 *         description: Yeni cihaz başarıyla eklendi
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Cihaz'
 *       500:
 *         description: Server hatası
 */
router.post("/", urlencodedParser, async function (req, res, next) {
    var service = new CihazlarService();
    const cihazObj = new CihazObject();
    cihazObj.adi = req.body.adi;
    cihazObj.kat = req.body.kat;
    cihazObj.mekanId = req.body.mekan_id;
    cihazObj.binaId = req.body.bina_id;
    cihazObj.kampusId = req.body.kampus_id;
    cihazObj.veriGondermeSikligi = req.body.veri_gonderme_sikligi;

    var result = await service.add(cihazObj);
    res.send(result);
});


/**
 * @swagger
 * /cihaz/:
 *   put:
 *     summary: Id numarasına göre cihazları güncelle
 *     tags: [cihazlar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               $ref: '#/components/schemas/Cihaz'
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
router.put("/", urlencodedParser, async function (req, res, next) {
    var service = new CihazlarService();
    const cihazObj = new CihazObject();
    cihazObj.id = req.body.id;
    cihazObj.adi = req.body.adi;
    cihazObj.kat = req.body.kat;
    cihazObj.mekanId = req.body.mekanId;
    cihazObj.binaId = req.body.binaId;
    cihazObj.kampusId = req.body.kampusId;
    cihazObj.veriGondermeSikligi = req.body.veriGondermeSikligi;
    cihazObj.aktif = req.body.aktif;

    var result = await service.update(cihazObj);
    res.send(result);
});


/**
 * @swagger
 * /cihaz/{id}:
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
 *     responses:
 *       200:
 *         description: Veri başarıyla silindi
 *       404:
 *         description: Veri bulunamadı
 */
router.delete("/:id", async function (req, res, next) {
    var service = new CihazlarService();
    var result = await service.delete(req.params.id);
    res.send(result);
})


/**
 * @swagger
 * /cihaz/mekan/{mekanId}:
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
 *     responses:
 *       200:
 *         description: Tüm data döner
 */
router.get("/mekan/:mekanId", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.getAllByMekan(req.params.mekanId);
    res.send(response);
});

/**
 * @swagger
 * /cihaz/bina/{binaId}:
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
 *     responses:
 *       200:
 *         description: Tüm data döner
 */
router.get("/bina/:binaId", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.getAllByBina(req.params.binaId);
    res.send(response);
});

/**
 * @swagger
 * /cihaz/kampus/{kampusId}:
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
 *     responses:
 *       200:
 *         description: Tüm data döner
 */
router.get("/kampus/:kampusId", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.getAllByKampus(req.params.kampusId);
    res.send(response);
});

/**
 * @swagger
 * /cihaz/aktif/{aktif}:
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
 *     responses:
 *       200:
 *         description: Tüm data döner
 */
 router.get("/aktif/:aktif", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.getAllByAktif(req.params.aktif);
    res.send(response);
});

/**
 * @swagger
 * /cihaz/durum/{durum}:
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
 *     responses:
 *       200:
 *         description: Tüm data döner
 */
 router.get("/durum/:durum", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.getAllByDurum(req.params.durum);
    res.send(response);
});

module.exports = router;
