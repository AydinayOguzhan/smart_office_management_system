// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
// const SensorService = require('../business/sensor_service');
// var urlencodedParser = bodyParser.urlencoded({ extended: false })


// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Sensor:
//  *       type: object
//  *       required:
//  *         - cihazId
//  *         - kategoriId
//  *         - parcaAdi
//  *       properties:
//  *         id:
//  *           type: number
//  *           description: Parçanın Id numarası. Otomatik oluşturulur.
//  *         cihazId:
//  *           type: number
//  *           description: Parçanın takılı olduğu cihazın Id numarası.
//  *         kategoriId:
//  *           type: number
//  *           description: Parçanın ait olduğu kategorinin Id numarası.
//  *         parcaAdi:
//  *           type: string
//  *           description: Parçaya verilmiş isim.
//  *         eklenmeTarihi:
//  *           type: string
//  *           description: Parçanın sisteme eklendiği tarih. Otomatik atanır.
//  *         durum:
//  *           type: boolean
//  *           description: Verinin aktif olup olmadığını gösteren alan. Otomatik atanır. 
//  */

// /**
//  * @swagger
//  * tags:
//  *   name: sensorler
//  *   description: Sensorler
//  */

// /**
//  * @swagger
//  * /sensor/{email}:
//  *   get:
//  *     summary: Tüm sensörleri getirir
//  *     tags: [sensorler]
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
//     // res.render('index', { title: 'Express' }); 
//     var service = new SensorService();
//     const response = await service.getAll(req.params.email);
//     res.send(response);
// });

// /**
//  * @swagger
//  * /sensor/without_durum/{email}:
//  *   get:
//  *     summary: Sistemdeki silinmiş sensörler dahil bütün parçaları getirir
//  *     tags: [sensorler]
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
//  router.get("/without_durum/:email", async function (req, res, next) {
//     // res.render('index', { title: 'Express' }); 
//     var service = new SensorService();
//     const response = await service.getAllByWithoutDurum(req.params.email);
//     res.send(response);
// });


// /**
//  * @swagger
//  * /sensor/{id}/{email}:
//  *   get:
//  *     summary: Parçanın Id numarasına göre sensörü getir
//  *     tags: [sensorler]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: number
//  *         required: true
//  *         description: Sensöre ait Id numarası
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
// router.get('/:id/:email', async function (req, res, next) {
//     // res.render('index', { title: 'Express' });
//     // res.send(req.params.id)
//     var service = new SensorService();
//     var response = await service.getById(req.params.id, req.params.email);
//     res.send(response);
// });


// /**
//  * @swagger
//  * /sensor/{email}:
//  *   post:
//  *      summary: Sensörler tablosuna yeni parça ekle
//  *      tags: [sensorler]
//  *      parameters:
//  *       - in: path
//  *         name: email
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Kullanıcıya ait email
//  *      requestBody:
//  *          required: true
//  *          content:
//  *              application/json:
//  *               schema:
//  *                  $ref: '#/components/schemas/Sensor'
//  *      responses:
//  *          200:
//  *              description: İşlem başarılı
//  */
// router.post("/:email", urlencodedParser, async function (req, res, next) {
//     var service = new SensorService();
//     const parcaObj = {
//         cihazId: req.body.cihazId,
//         kategoriId: req.body.kategoriId,
//         parcaAdi: req.body.parcaAdi,
//     };

//     var result = await service.add(parcaObj, req.params.email);
//     res.send(result);
// });


// /**
//  * @swagger
//  * /sensor/{email}:
//  *   put:
//  *      summary: Sensörler tablosundaki bir parçayı güncelle
//  *      tags: [sensorler]
//  *      parameters:
//  *       - in: path
//  *         name: email
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Kullanıcıya ait email
//  *      requestBody:
//  *          required: true
//  *          content:
//  *              application/json:
//  *               schema:
//  *                  $ref: '#/components/schemas/Sensor'
//  *      responses:
//  *          200:
//  *              description: İşlem başarılı
//  */
// router.put("/:email", urlencodedParser, async function (req, res, next) {
//     var service = new SensorService();
//     const parcaObj = {
//         id: req.body.id,
//         cihazId: req.body.cihazId,
//         kategoriId: req.body.kategoriId,
//         parcaAdi: req.body.parcaAdi,
//         durum: req.body.durum,
//     };

//     var result = await service.update(parcaObj, req.params.email);
//     res.send(result);
// });


// /**
//  * @swagger
//  * /sensor/{id}/{email}:
//  *   delete:
//  *     summary: Sensörü sil
//  *     tags: [sensorler]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: number
//  *         required: true
//  *         description: Sensöre ait Id numarası
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
// router.delete("/:id/:email", async function (req, res, next) {
//     var service = new SensorService();
//     var result = await service.delete(req.params.id, req.params.email);
//     res.send(result);
// })


// /**
//  * @swagger
//  * /sensor/durum/{durum}/{email}:
//  *   get:
//  *     summary: İsteğe göre silinmiş veya silinmemiş sensörleri getir
//  *     tags: [sensorler]
//  *     parameters:
//  *       - in: path
//  *         name: durum
//  *         schema:
//  *           type: boolean
//  *         required: true
//  *         description: Sensöre ait durum bilgisi
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
// router.get('/durum/:durum/:email', async function (req, res, next) {
//     var service = new SensorService();
//     var response = await service.getAllByDurum(req.params.durum, req.params.email);
//     res.send(response);
// });


// /**
//  * @swagger
//  * /sensor/tarih/{startDate}/{endDate}/{email}:
//  *   get:
//  *     summary: Tarih aralığına göre sensörleri getir
//  *     tags: [sensorler]
//  *     parameters:
//  *       - in: path
//  *         name: startDate
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Sensöre ait eklenme tarihi bilgisi
//  *       - in: path
//  *         name: endDate
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: Sensöre ait eklenme tarihi bilgisi
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
// router.get('/tarih/:startDate/:endDate/:email', async function (req, res, next) {
//     var service = new SensorService();
//     var response = await service.getAllByDate(req.params.startDate, req.params.endDate, req.params.email);
//     res.send(response);
// });

// /**
//  * @swagger
//  * /sensor/kategori/{kategoriId}/{email}:
//  *   get:
//  *     summary: Seçilen kategoriye göre sensörleri getir
//  *     tags: [sensorler]
//  *     parameters:
//  *       - in: path
//  *         name: kategoriId
//  *         schema:
//  *           type: number
//  *         required: true
//  *         description: Sensöre ait kategori Id numarası
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
// router.get('/kategori/:kategoriId/:email', async function (req, res, next) {
//     var service = new SensorService();
//     var response = await service.getAllByCategory(req.params.kategoriId, req.params.email);
//     res.send(response);
// });

// /**
//  * @swagger
//  * /sensor/cihaz/{cihazId}/{email}:
//  *   get:
//  *     summary: Cihazın Id numarasına göre üzerinde takılı sensörleri getir
//  *     tags: [sensorler]
//  *     parameters:
//  *       - in: path
//  *         name: cihazId
//  *         schema:
//  *           type: number
//  *         required: true
//  *         description: Sensöre ait cihaz Id numarası
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
// router.get('/cihaz/:cihazId/:email', async function (req, res, next) {
//     var service = new SensorService();
//     var response = await service.getAllByCihaz(req.params.cihazId, req.params.email);
//     res.send(response);
// });


// module.exports = router;
