var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const { response } = require('../app');
const ParcaKategorilerService = require('../business/parca_kategoriler_service');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     Parca_Kategori:
 *       type: object
 *       required:
 *         - id
 *         - adi
 *       properties:
 *         id:
 *           type: number
 *           description: Parça kategorisine ait Id numarası. Otomatik olarak üretilir.
 *         adi:
 *           type: string
 *           description: Kategorinin adı
 *       example:
 *         id: 12
 *         adi: sensör
 */

/**
 * @swagger
 * tags:
 *   name: ParcaKategoriler
 *   description: Parca Kategoriler
 */

/**
 * @swagger
 * /parca_kategoriler/{email}:
 *   get:
 *     summary: Tüm parça kategorilerini getir
 *     tags: [ParcaKategoriler]
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
  var service = new ParcaKategorilerService();
  const response = await service.getAll(req.params.email);
  res.send(response);
});


/**
 * @swagger
 * /parca_kategoriler/{id}/{email}:
 *   get:
 *     summary: Parça kategorisinin Id numarasına göre parça kategorisini getir
 *     tags: [ParcaKategoriler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Parçanın kategorisine ait Id numarası
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
  var service = new ParcaKategorilerService();
  var response = await service.getById(req.params.id, req.params.email);
  res.send(response);
});


/**
 * @swagger
 * /parca_kategoriler/{email}:
 *   post:
 *      summary: Yeni bir parça kategorisi ekle
 *      tags: [ParcaKategoriler]
 *      parameters:
 *       - in: path
 *         name: string
 *         schema:
 *           type: email
 *         required: true
 *         description: Kullanıcıya ait email
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Parca_Kategori'
 *      responses:
 *          200:
 *              description: Ekleme işlemi başarılı
 */
router.post("/:email", urlencodedParser, async function (req, res, next) {
  var service = new ParcaKategorilerService();
  data = {
    adi: req.body.adi
  }
  var result = await service.add(data, req.params.email);
  res.send(result);
});

/**
 * @swagger
 * /parca_kategoriler/{email}:
 *   put:
 *      summary: Parça kategoriler tablosundaki bir parça kategorisini güncelle
 *      tags: [ParcaKategoriler]
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
 *                  $ref: '#/components/schemas/Parca_Kategori'
 *      responses:
 *          200:
 *              description: Ekleme işlemi başarılı
 */
router.put("/:email", urlencodedParser, async function (req, res, next) {
  var service = new ParcaKategorilerService();
  data = {
    id: req.body.id,
    adi: req.body.adi
  }
  var result = await service.update(data, req.params.email);
  res.send(result);
});


/**
 * @swagger
 * /parca_kategoriler/{id}/{email}:
 *   delete:
 *     summary: Bir parça kategorisini sil
 *     tags: [ParcaKategoriler]
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
  var service = new ParcaKategorilerService();
  var result = await service.delete(req.params.id, req.params.email);
  res.send(result);
})


module.exports = router;
