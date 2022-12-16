var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const CihazKategorilerService = require("../business/cihaz_kategoriler_service");

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     Cihaz_Kategori:
 *       type: object
 *       required:
 *         - id
 *         - adi
 *       properties:
 *         id:
 *           type: number
 *           description: Cihaz kategorisine ait Id numarası. Otomatik olarak üretilir.
 *         adi:
 *           type: string
 *           description: Kategorinin adı
 */

/**
 * @swagger
 * tags:
 *   name: CihazKategoriler
 *   description: Cihaz Kategoriler
 */

/**
 * @swagger
 * /cihaz_kategoriler/{email}:
 *   get:
 *     summary: Tüm cihaz kategorilerini getir
 *     tags: [CihazKategoriler]
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
  var service = new CihazKategorilerService();
  const response = await service.getAll(req.params.email);
  res.send(response);
});

/**
 * @swagger
 * /cihaz_kategoriler/without_durum/{email}:
 *   get:
 *     summary: Silinmiş olanlar dahil bütün cihaz kategorilerini getir
 *     tags: [CihazKategoriler]
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
    var service = new CihazKategorilerService();
    const response = await service.getAllWithoutDurum(req.params.email);
    res.send(response);
  });


/**
 * @swagger
 * /cihaz_kategoriler/{id}/{email}:
 *   get:
 *     summary: Cihaz kategorisinin Id numarasına göre parça kategorisini getir
 *     tags: [CihazKategoriler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Cihazın kategorisine ait Id numarası
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
  var service = new CihazKategorilerService();
  var response = await service.getById(req.params.id, req.params.email);
  res.send(response);
});


/**
 * @swagger
 * /cihaz_kategoriler/{email}:
 *   post:
 *      summary: Yeni bir cihaz kategorisi ekle
 *      tags: [CihazKategoriler]
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
 *                  $ref: '#/components/schemas/Cihaz_Kategori'
 *      responses:
 *          200:
 *              description: Ekleme işlemi başarılı
 */
router.post("/:email", urlencodedParser, async function (req, res, next) {
  var service = new CihazKategorilerService();
  data = {
    adi: req.body.adi
  }
  var result = await service.add(data, req.params.email);
  res.send(result);
});

/**
 * @swagger
 * /cihaz_kategoriler/{email}:
 *   put:
 *      summary: Cihaz kategoriler tablosundaki bir cihaz kategorisini güncelle
 *      tags: [CihazKategoriler]
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
 *                  $ref: '#/components/schemas/Cihaz_Kategori'
 *      responses:
 *          200:
 *              description: Ekleme işlemi başarılı
 */
router.put("/:email", urlencodedParser, async function (req, res, next) {
  var service = new CihazKategorilerService();
  data = {
    id: req.body.id,
    adi: req.body.adi
  }
  var result = await service.update(data, req.params.email);
  res.send(result);
});


/**
 * @swagger
 * /cihaz_kategoriler/{id}/{email}:
 *   delete:
 *     summary: Bir cihaz kategorisini sil
 *     tags: [CihazKategoriler]
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
  var service = new CihazKategorilerService();
  var result = await service.delete(req.params.id, req.params.email);
  res.send(result);
})


module.exports = router;
