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
 * /parca_kategoriler/:
 *   get:
 *     summary: Returns all parca_kategoriler
 *     tags: [ParcaKategoriler]
 *     responses:
 *       200:
 *         description: All data
 */
router.get("/", async function(req, res, next){
  // res.render('index', { title: 'Express' }); 
  var service = new ParcaKategorilerService();
  const response = await service.getAll();
  res.send(response);
});


/**
 * @swagger
 * /parca_kategoriler/{id}:
 *   get:
 *     summary: Get the parca_kategoriler by id
 *     tags: [ParcaKategoriler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The parca_kategoriler id
 *     responses:
 *       200:
 *         description: The specific data by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parca_Kategori'
 *       404:
 *         description: The data was not found
 */
router.get('/:id', async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.send(req.params.id)
  var service = new ParcaKategorilerService();
  var response = await service.getById(req.params.id);
  res.send(response);
});


/**
 * @swagger
 * /parca_kategoriler/:
 *   post:
 *     summary: Add new data to parca_kategoriler
 *     tags: [ParcaKategoriler]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               $ref: '#/components/schemas/Parca_Kategori'
 *     responses:
 *       200:
 *         description: New data successfully added
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Parca_Kategori'
 *       500:
 *         description: Some server error
 */
router.post("/", urlencodedParser, async function (req, res, next) {
  var service = new ParcaKategorilerService();
  data = {
    adi: req.body.name
  }
  var result = await service.add(data);
  res.send(result);
});


/**
 * @swagger
 * /parca_kategoriler/:
 *   put:
 *     summary: Update the data of the parca_kategoriler by id
 *     tags: [ParcaKategoriler]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               $ref: '#/components/schemas/Parca_Kategori'
 *     responses:
 *       200:
 *         description: New data successfully updated
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Parca_Kategori'
 *       500:
 *         description: Some server error
 */
router.put("/", urlencodedParser, async function (req, res, next) {
  var service = new ParcaKategorilerService();
  data = {
    id: req.body.id,
    adi: req.body.name
  }
  var result = await service.update(data);
  res.send(result);
});


/**
 * @swagger
 * /parca_kategoriler/{id}:
 *   delete:
 *     summary: Delete the data by id
 *     tags: [ParcaKategoriler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: The data id
 *     responses:
 *       200:
 *         description: The data successfully deleted
 *       404:
 *         description: The data was not found
 */
router.delete("/:id", async function (req, res, next) {
  var service = new ParcaKategorilerService();
  var result = await service.delete(req.params.id);
  res.send(result);
})


module.exports = router;
