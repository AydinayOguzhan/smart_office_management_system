var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const { response } = require('../app');
const SensorKategorilerService = require('../business/sensor_kategoriler_service');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     sensor_kategori:
 *       type: object
 *       required:
 *         - id
 *         - adi
 *         - durum
 *       properties:
 *         id:
 *           type: number
 *           description: Parça kategorisine ait Id numarası. Otomatik olarak üretilir.
 *         adi:
 *           type: string
 *           description: Kategorinin adı
 *         durum:
 *           type: number
 *           description: Verinin silinip-silinmeme durumu
 */

/**
 * @swagger
 * tags:
 *   name: SensorKategoriler
 *   description: Sensor Kategoriler
 */

/**
 * @swagger
 * /sensor_kategoriler/{email}:
 *   get:
 *     summary: Tüm sensör kategorilerini getir
 *     tags: [SensorKategoriler]
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
router.get("/:email", async function(req, res, next){
  // res.render('index', { title: 'Express' }); 
  var service = new SensorKategorilerService();
  const response = await service.getAll(req.params.email);
  res.send(response);
});

/**
 * @swagger
 * /sensor_kategoriler/without_durum/{email}:
 *   get:
 *     summary: Silinenler dahil tüm sensör kategorilerini getir
 *     tags: [SensorKategoriler]
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
 router.get("/without_durum/:email", async function(req, res, next){
  // res.render('index', { title: 'Express' }); 
  var service = new SensorKategorilerService();
  const response = await service.getAllWithoutDurum(req.params.email);
  res.send(response);
})


/**
 * @swagger
 * /sensor_kategoriler/{id}/{email}:
 *   get:
 *     summary: Sensör kategorisinin Id numarasına göre parça kategorisini getir
 *     tags: [SensorKategoriler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Sensörün kategorisine ait Id numarası
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
  var service = new SensorKategorilerService();
  var response = await service.getById(req.params.id, req.params.email);
  res.send(response);
});


/**
 * @swagger
 * /sensor_kategoriler/{email}:
 *   post:
 *      summary: Yeni bir sensör kategorisi ekle
 *      tags: [SensorKategoriler]
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
 *                  $ref: '#/components/schemas/sensor_kategori'
 *      responses:
 *          200:
 *              description: Ekleme işlemi başarılı
 */
router.post("/:email", urlencodedParser, async function (req, res, next) {
  var service = new SensorKategorilerService();
  data = {
    adi: req.body.adi
  }
  var result = await service.add(data, req.params.email);
  res.send(result);
});

/**
 * @swagger
 * /sensor_kategoriler/{email}:
 *   put:
 *      summary: Sensör kategoriler tablosundaki bir parça kategorisini güncelle
 *      tags: [SensorKategoriler]
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
 *                  $ref: '#/components/schemas/sensor_kategori'
 *      responses:
 *          200:
 *              description: Ekleme işlemi başarılı
 */
router.put("/:email", urlencodedParser, async function (req, res, next) {
  var service = new SensorKategorilerService();
  data = {
    id: req.body.id,
    adi: req.body.adi
  }
  var result = await service.update(data, req.params.email);
  res.send(result);
});


/**
 * @swagger
 * /sensor_kategoriler/{id}/{email}:
 *   delete:
 *     summary: Bir sensör kategorisini sil
 *     tags: [SensorKategoriler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Silinecek kategoriye ait Id numarası
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: işlem başarılı
 */
router.delete("/:id/:email", async function (req, res, next) {
  var service = new SensorKategorilerService();
  var result = await service.delete(req.params.id, req.params.email);
  res.send(result);
})


module.exports = router;
