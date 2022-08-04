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
 *           description: The auto-generated id of the parca_kategoriler
 *         adi:
 *           type: string
 *           description: The name of the kategori
 *       example:
 *         id: 12
 *         adi: sensör
 */

/**
 * @swagger
 * tags:
 *   name: ParcaKategoriler
 *   description: Parca Kategori Page
 */

/**
 * @swagger
 * /parca_kategoriler/{userId}:
 *   get:
 *     summary: Tüm ölçümleri döndürür
 *     tags: [ParcaKategoriler]
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
router.get("/:userId", async function(req, res, next){
  // res.render('index', { title: 'Express' }); 
  var service = new ParcaKategorilerService();
  const response = await service.getAll(req.params.userId);
  res.send(response);
});


/**
 * @swagger
 * /parca_kategoriler/{id}/{userId}:
 *   get:
 *     summary: Get the parca_kategoriler by id
 *     tags: [ParcaKategoriler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Parçanın kategorisine ait Id numarası
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
  var service = new ParcaKategorilerService();
  var response = await service.getById(req.params.id, req.params.userId);
  res.send(response);
});


/**
 * @swagger
 * /parca_kategoriler/{userId}:
 *   post:
 *      summary: Yeni bir parça kategorisi ekle
 *      tags: [ParcaKategoriler]
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
 *                  $ref: '#/components/schemas/Parca_Kategori'
 *      responses:
 *          200:
 *              description: Ekleme işlemi başarılı
 *          500: 
 *              description: Server hatası
 */
router.post("/:userId", urlencodedParser, async function (req, res, next) {
  var service = new ParcaKategorilerService();
  data = {
    adi: req.body.adi
  }
  var result = await service.add(data, req.params.userId);
  res.send(result);
});

/**
 * @swagger
 * /parca_kategoriler/{userId}:
 *   put:
 *      summary: Parça kategoriler tablosundaki bir parça kategorisini güncelle
 *      tags: [ParcaKategoriler]
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
 *                  $ref: '#/components/schemas/Parca_Kategori'
 *      responses:
 *          200:
 *              description: Ekleme işlemi başarılı
 *          500: 
 *              description: Server hatası
 */
router.put("/:userId", urlencodedParser, async function (req, res, next) {
  var service = new ParcaKategorilerService();
  data = {
    id: req.body.id,
    adi: req.body.adi
  }
  var result = await service.update(data, req.params.userId);
  res.send(result);
});


/**
 * @swagger
 * /parca_kategoriler/{id}/{userId}:
 *   delete:
 *     summary: Delete the data by id
 *     tags: [ParcaKategoriler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Silinecek kategoriye ait Id numarası
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: işlem başarılı
 */
router.delete("/:id/:userId", async function (req, res, next) {
  var service = new ParcaKategorilerService();
  var result = await service.delete(req.params.id, req.params.userId);
  res.send(result);
})


module.exports = router;
