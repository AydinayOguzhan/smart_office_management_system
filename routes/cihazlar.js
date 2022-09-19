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
 *           description: Cihazın saniye cinsinden veri gönderme sıklığı.
 *         ip_adresi:
 *           type: string
 *           description: Cihaza ait Ip adresi. Cihaz tarafından atanır.
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
 *     summary: Tüm cihazları getir.
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
 *         description: İşlem başarılı
 */
router.get("/:userId", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.getAll(req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /cihaz/check/is_working/{timeOut}:
 *   get:
 *     summary: Cihazın çalışırlık durumunu kontrol et. Çalıştırıldığında, durdurulana kadar çalışmaya devam eder. 
 *     tags: [cihazlar]
 *     parameters:
 *      - in: path
 *        name: timeOut
 *        schema:
 *          type: number
 *        required: true
 *        description: Kontrolün ne kadar sürede bir yapılacağını gösteren milisaniye cinsi değişken
 *     responses:
 *      200:
 *          description: İşlem başarılı
 */
router.get("/check/is_working/:timeOut", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.checkIfCihazWorks(req.params.timeOut);
    // res.send(response);
    // res.sendStatus(response);
});


/**
 * @swagger
 * /cihaz/without_durum/{userId}:
 *   get:
 *     summary: Sistemdeki silinmiş cihazlar dahil bütün cihazları getir. 
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
 *         description: İşlem başarılı
 */
 router.get("/without_durum/:userId", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.getAllByWithoutDurum(req.params.userId);
    res.send(response);
});



/**
 * @swagger
 * /cihaz/id/{id}/{userId}:
 *   get:
 *     summary: Cihazın Id numarasına göre cihazı getir.
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
 *         description: İşlem başarılı
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
 *      summary: Sisteme yeni cihaz bilgisi ekle.
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
 *              description: İşlem başarılı.
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
 *     summary: Cihazların Id numarasına göre cihazları güncelle
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
 *         description: İşlem başarılı
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
 * /cihaz/ip/{id}/{ipAddress}/{userId}:
 *   put:
 *     summary: Id numarasına göre cihazların Ip adreslerini güncelle
 *     tags: [cihazlar]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: Cihaza ait Id numarası
 *      - in: path
 *        name: ipAddress
 *        schema:
 *          type: text
 *        required: false
 *        description: Cihaza ait Ip numarası
 *      - in: path
 *        name: userId
 *        schema:
 *          type: number
 *        required: true
 *        description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: Data başarıyla güncellendi
 */
 router.put("/ip/:id/:ipAddress/:userId", urlencodedParser, async function (req, res, next) {
    var service = new CihazlarService();
    var result = await service.updateIpAddress(req.params.id, req.params.ipAddress, req.params.userId);
    res.send(result);
});



/**
 * @swagger
 * /cihaz/{id}/{userId}:
 *   delete:
 *     summary: Cihazı sil
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
 *     summary: Bulundukları mekana göre cihazları getir.
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
 *         description: İşlem başarılı 
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
 *     summary: Bulundukları binaya göre cihazları getir.
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
 *         description: İşlem başarılı 
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
 *     summary: Bulundukları kampüse göre cihazları getir. 
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
 *         description: İşlem başarılı
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
 *     summary: Aktiflik durumlarına göre cihazları getir. 
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
 *         description: İşlem başarılı
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
 *     summary: İsteğe göre silinmiş veya silinmemiş cihazları getir
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
 *         description: İşlem başarılı
 */
router.get("/durum/:durum/:userId", async function (req, res, next) {
    var service = new CihazlarService();
    const response = await service.getAllByDurum(req.params.durum, req.params.userId);
    res.send(response);
});



module.exports = router;
