<<<<<<< HEAD
// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
// const CihazlarService = require('../business/cihazlar_service');

// var urlencodedParser = bodyParser.urlencoded({ extended: false })


// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Cihaz:
//  *       type: object
//  *       required:
//  *         - adi
//  *         - kategori_id
//  *         - meksis_kod
//  *         - bina_id
//  *         - kampus_id
//  *       properties:
//  *         id:
//  *           type: number
//  *           description: Cihazın Id numarası. Otomatik oluşturulur.
//  *         kategori_id:
//  *           type: number
//  *           description: Cihazın kategorisine ait Id numarası.
//  *         adi:
//  *           type: string
//  *           description: Cihazın adı.
//  *         meksis_kod:
//  *           type: string
//  *           description: Cihazın bulunduğu yerin meksis kodu.
//  *         bina_id:
//  *           type: string
//  *           description: Cihazın bulunduğu binanın Id numarası.
//  *         kampus_id:
//  *           type: string
//  *           description: Cihazın bulunduğu kampüsün Id numarası.
//  *         universite_id:
//  *           type: number
//  *           description: Cihazın bulunduğu üniversitenin Id numarası. Otomatik atanır.
//  *         veri_gonderme_sikligi:
//  *           type: number
//  *           description: Cihazın saniye cinsinden veri gönderme sıklığı.
//  *         ip_adresi:
//  *           type: string
//  *           description: Cihaza ait Ip adresi. Cihaz tarafından atanır.
//  *         aktif:
//  *           type: boolean
//  *           description: Cihazın çalışıp çalışmadığını gösteren alan.
//  *         eklenme_tarihi:
//  *           type: string
//  *           description: Cihazın sisteme eklendiği tarih. Otomatik atanır.
//  *         durum:
//  *           type: boolean
//  *           description: Verinin aktif olup olmadığını gösteren alan. Otomatik atanır. 
//  */

// /**
//  * @swagger
//  * tags:
//  *   name: cihazlar
//  *   description: Cihazlar
//  */

// /**
//  * @swagger
//  * /cihaz/{email}:
//  *   get:
//  *     summary: Tüm cihazları getir.
//  *     tags: [cihazlar]
//  *     parameters:
//  *      - in: path
//  *        name: email
//  *        schema:
//  *          type: string
//  *        required: true
//  *        description: Kullanıcıya ait email
//  *     responses:
//  *       200:
//  *         description: İşlem başarılı
//  */
// router.get("/:email", async function (req, res, next) {
//     var service = new CihazlarService();
//     const response = await service.getAll(req.params.email);
//     res.send(response);
// });

// /**
//  * @swagger
//  * /cihaz/check/is_working/{timeOut}:
//  *   get:
//  *     summary: Cihazın çalışırlık durumunu kontrol et. Çalıştırıldığında, durdurulana kadar çalışmaya devam eder. 
//  *     tags: [cihazlar]
//  *     parameters:
//  *      - in: path
//  *        name: timeOut
//  *        schema:
//  *          type: number
//  *        required: true
//  *        description: Kontrolün ne kadar sürede bir yapılacağını gösteren milisaniye cinsi değişken
//  *     responses:
//  *      200:
//  *          description: İşlem başarılı
//  */
// router.get("/check/is_working/:timeOut", async function (req, res, next) {
//     var service = new CihazlarService();
//     const response = await service.checkIfCihazWorks(req.params.timeOut);
//     // res.send(response);
//     // res.sendStatus(response);
// });


// /**
//  * @swagger
//  * /cihaz/without_durum/{email}:
//  *   get:
//  *     summary: Sistemdeki silinmiş cihazlar dahil bütün cihazları getir. 
//  *     tags: [cihazlar]
//  *     parameters:
//  *      - in: path
//  *        name: email
//  *        schema:
//  *          type: email
//  *        required: true
//  *        description: Kullanıcıya ait email
//  *     responses:
//  *       200:
//  *         description: İşlem başarılı
//  */
//  router.get("/without_durum/:email", async function (req, res, next) {
//     var service = new CihazlarService();
//     const response = await service.getAllByWithoutDurum(req.params.email);
//     res.send(response);
// });



// /**
//  * @swagger
//  * /cihaz/id/{id}/{email}:
//  *   get:
//  *     summary: Cihazın Id numarasına göre cihazı getir.
//  *     tags: [cihazlar]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: number
//  *         required: true
//  *         description: Cihaza ait Id numarası
//  *       - in: path
//  *         name: email
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Kullanıcıya ait email
//  *     responses:
//  *       200:
//  *         description: İşlem başarılı
//  */
// router.get('/id/:id/:email', async function (req, res, next) {
//     // res.render('index', { title: 'Express' });
//     // res.send(req.params.id)
//     var service = new CihazlarService();
//     var response = await service.getById(req.params.id, req.params.email);
//     res.send(response);
// });

// /**
//  * @swagger
//  * /cihaz/kategori/{kategori_id}/{email}:
//  *   get:
//  *     summary: Kategori Id numarasına göre cihazları getir.
//  *     tags: [cihazlar]
//  *     parameters:
//  *       - in: path
//  *         name: kategori_id
//  *         schema:
//  *           type: number
//  *         required: true
//  *         description: Cihazın kategorisine ait Id numarası
//  *       - in: path
//  *         name: email
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Kullanıcıya ait email
//  *     responses:
//  *       200:
//  *         description: İşlem başarılı
//  */
//  router.get('/kategori/:kategori_id/:email', async function (req, res, next) {
//     var service = new CihazlarService();
//     var response = await service.getAllByKategoriId(req.params.kategori_id, req.params.email);
//     res.send(response);
// });



// /**
//  * @swagger
//  * /cihaz/{email}:
//  *   post:
//  *      summary: Sisteme yeni cihaz bilgisi ekle.
//  *      tags: [cihazlar]
//  *      parameters:
//  *       - in: path
//  *         name: email
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Kullanıcıya ait Id numarası
//  *      requestBody:
//  *          required: true
//  *          content:
//  *              application/json:
//  *               schema:
//  *                  $ref: '#/components/schemas/Cihaz'
//  *      responses:
//  *          200:
//  *              description: İşlem başarılı.
//  */
// router.post("/:email", urlencodedParser, async function (req, res, next) {
//     var service = new CihazlarService();
//     const cihazObj = {
//         adi: req.body.adi,
//         kategoriId: req.body.kategori_id,
//         meksisKod: req.body.meksis_kod,
//         binaId: req.body.bina_id,
//         kampusId: req.body.kampus_id,
//         veriGondermeSikligi: req.body.veri_gonderme_sikligi,
//     };

//     var result = await service.add(cihazObj, req.params.email);
//     res.send(result);
// });


// /**
//  * @swagger
//  * /cihaz/{email}:
//  *   put:
//  *     summary: Cihazların Id numarasına göre cihazları güncelle
//  *     tags: [cihazlar]
//  *     parameters:
//  *      - in: path
//  *        name: email
//  *        schema:
//  *          type: string
//  *        required: true
//  *        description: Kullanıcıya ait Id numarası
//  *     requestBody:
//  *         required: true
//  *         content:
//  *             application/json:
//  *              schema:
//  *                 $ref: '#/components/schemas/Cihaz'
//  *     responses:
//  *       200:
//  *         description: İşlem başarılı
//  */
// router.put("/:email", urlencodedParser, async function (req, res, next) {
//     var service = new CihazlarService();
//     const cihazObj = {
//         id: req.body.id,
//         kategoriId: req.body.kategori_id,
//         adi: req.body.adi,
//         meksisKod: req.body.meksis_kod,
//         binaId: req.body.bina_id,
//         kampusId: req.body.kampus_id,
//         veriGondermeSikligi: req.body.veri_gonderme_sikligi,
//         aktif: req.body.aktif,
//     };

//     var result = await service.update(cihazObj, req.params.email);
//     res.send(result);
// });


// /**
//  * @swagger
//  * /cihaz/ip/{id}/{ipAddress}/{email}:
//  *   put:
//  *     summary: Id numarasına göre cihazların Ip adreslerini güncelle
//  *     tags: [cihazlar]
//  *     parameters:
//  *      - in: path
//  *        name: id
//  *        schema:
//  *          type: number
//  *        required: true
//  *        description: Cihaza ait Id numarası
//  *      - in: path
//  *        name: ipAddress
//  *        schema:
//  *          type: text
//  *        required: false
//  *        description: Cihaza ait Ip numarası
//  *      - in: path
//  *        name: email
//  *        schema:
//  *          type: string
//  *        required: true
//  *        description: Kullanıcıya ait email
//  *     responses:
//  *       200:
//  *         description: Data başarıyla güncellendi
//  */
//  router.put("/ip/:id/:ipAddress/:email", urlencodedParser, async function (req, res, next) {
//     var service = new CihazlarService();
//     var result = await service.updateIpAddress(req.params.id, req.params.ipAddress, req.params.email);
//     res.send(result);
// });



// /**
//  * @swagger
//  * /cihaz/{id}/{email}:
//  *   delete:
//  *     summary: Cihazı sil
//  *     tags: [cihazlar]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: number
//  *         required: true
//  *         description: Cihaza ait Id numarası
//  *       - in: path
//  *         name: email
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Kullanıcıya ait email
//  *     responses:
//  *       200:
//  *         description: Veri başarıyla silindi
//  */
// router.delete("/:id/:email", async function (req, res, next) {
//     var service = new CihazlarService();
//     var result = await service.delete(req.params.id, req.params.email);
//     res.send(result);
// })


// /**
//  * @swagger
//  * /cihaz/meksis/{meksis_kod}/{email}:
//  *   get:
//  *     summary: Meksis koduna göre cihazları getirir.
//  *     tags: [cihazlar]
//  *     parameters:
//  *      - in: path
//  *        name: meksis_kod
//  *        schema:
//  *          type: string
//  *        required: true
//  *        description: Cihazın bulunduğu mekanın meksis kodu
//  *      - in: path
//  *        name: email
//  *        schema:
//  *          type: string
//  *        required: true
//  *        description: Kullanıcıya ait Id numarası
//  *     responses:
//  *       200:
//  *         description: İşlem başarılı 
//  */
// router.get("/meksis/:meksis_kod/:email", async function (req, res, next) {
//     var service = new CihazlarService();
//     const response = await service.getAllByMeksis(req.params.meksis_kod, req.params.email);
//     res.send(response);
// });

// /**
//  * @swagger
//  * /cihaz/bina/{binaId}/{email}:
//  *   get:
//  *     summary: Bulundukları binaya göre cihazları getir.
//  *     tags: [cihazlar]
//  *     parameters:
//  *      - in: path
//  *        name: binaId
//  *        schema:
//  *          type: number
//  *        required: true
//  *        description: Cihazın bulunduğu binaya ait Id numarası
//  *      - in: path
//  *        name: email
//  *        schema:
//  *          type: string
//  *        required: true
//  *        description: Kullanıcıya ait email
//  *     responses:
//  *       200:
//  *         description: İşlem başarılı 
//  */
// router.get("/bina/:binaId/:email", async function (req, res, next) {
//     var service = new CihazlarService();
//     const response = await service.getAllByBina(req.params.binaId, req.params.email);
//     res.send(response);
// });

// /**
//  * @swagger
//  * /cihaz/kampus/{kampusId}/{email}:
//  *   get:
//  *     summary: Bulundukları kampüse göre cihazları getir. 
//  *     tags: [cihazlar]
//  *     parameters:
//  *      - in: path
//  *        name: kampusId
//  *        schema:
//  *          type: number
//  *        required: false
//  *        description: Cihazın bulunduğu kampüse ait Id numarası
//  *      - in: path
//  *        name: email
//  *        schema:
//  *          type: number
//  *        required: true
//  *        description: Kullanıcıya ait email
//  *     responses:
//  *       200:
//  *         description: İşlem başarılı
//  */
// router.get("/kampus/:kampusId/:email", async function (req, res, next) {
//     var service = new CihazlarService();
//     const response = await service.getAllByKampus(req.params.kampusId, req.params.email);
//     res.send(response);
// });

// /**
//  * @swagger
//  * /cihaz/aktif/{aktif}/{email}:
//  *   get:
//  *     summary: Aktiflik durumlarına göre cihazları getir. 
//  *     tags: [cihazlar]
//  *     parameters:
//  *      - in: path
//  *        name: aktif
//  *        schema:
//  *          type: boolean
//  *        required: false
//  *        description: Cihazın aktiflik durumu. 1-Aktif 2-Deaktif
//  *      - in: path
//  *        name: email
//  *        schema:
//  *          type: string
//  *        required: true
//  *        description: Kullanıcıya ait email
//  *     responses:
//  *       200:
//  *         description: İşlem başarılı
//  */
// router.get("/aktif/:aktif/:email", async function (req, res, next) {
//     var service = new CihazlarService();
//     const response = await service.getAllByAktif(req.params.aktif, req.params.email);
//     res.send(response);
// });

// /**
//  * @swagger
//  * /cihaz/durum/{durum}/{email}:
//  *   get:
//  *     summary: İsteğe göre silinmiş veya silinmemiş cihazları getir
//  *     tags: [cihazlar]
//  *     parameters:
//  *      - in: path
//  *        name: durum
//  *        schema:
//  *          type: boolean
//  *        required: false
//  *        description: Cihazın durumu. 1-Aktif 2-Deaktif
//  *      - in: path
//  *        name: email
//  *        schema:
//  *          type: string
//  *        required: true
//  *        description: Kullanıcıya ait Id numarası
//  *     responses:
//  *       200:
//  *         description: İşlem başarılı
//  */
// router.get("/durum/:durum/:email", async function (req, res, next) {
//     var service = new CihazlarService();
//     const response = await service.getAllByDurum(req.params.durum, req.params.email);
//     res.send(response);
// });



// module.exports = router;

