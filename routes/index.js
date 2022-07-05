// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
// const { response } = require('../app');
// const indexService = require("../business/index_service");

// var urlencodedParser = bodyParser.urlencoded({ extended: false })


// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Data:
//  *       type: object
//  *       required:
//  *         - id
//  *         - name
//  *       properties:
//  *         id:
//  *           type: number
//  *           description: The auto-generated id of the book
//  *         name:
//  *           type: string
//  *           description: The name of the data
//  *       example:
//  *         id: 12
//  *         name: The New Turing Omnibus
//  */

// /**
//  * @swagger
//  * tags:
//  *   name: Index
//  *   description: Index page
//  */

// /**
//  * @swagger
//  * /:
//  *   get:
//  *     summary: Returns index page
//  *     tags: [Index]
//  *     responses:
//  *       200:
//  *         description: Index page
//  */
// router.get('/', function (req, res, next) {
//   // res.render('index', { title: 'Express' });
//   console.log("index/get/");
//   var service = new indexService();
//   res.send(service.getAll());
// });


// /**
//  * @swagger
//  * /{id}:
//  *   get:
//  *     summary: Get the data by id
//  *     tags: [Index]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: number
//  *         required: true
//  *         description: The data id
//  *     responses:
//  *       200:
//  *         description: The data description by id
//  *         contens:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Data'
//  *       404:
//  *         description: The book was not found
//  */
// router.get('/:id', function (req, res, next) {
//   // res.render('index', { title: 'Express' });
//   // res.send(req.params.id)
//   var service = new indexService();
//   res.send(service.getById(req.params.id))
// });


// /**
//  * @swagger
//  * /:
//  *   post:
//  *     summary: Add new data to index page
//  *     tags: [Index]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *          schema:
//  *               $ref: '#/components/schemas/Data'
//  *     responses:
//  *       200:
//  *         description: New data successfully added
//  *         content:
//  *           application/json:
//  *            schema:
//  *               $ref: '#/components/schemas/Data'
//  *       500:
//  *         description: Some server error
//  */
// router.post("/", urlencodedParser, function (req, res, next) {
//   data = {
//     id: req.body.id,
//     name: req.body.name
//   }
//   res.send(data)
// });


// /**
//  * @swagger
//  * /:
//  *   put:
//  *     summary: Add new data to index page
//  *     tags: [Index]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *          schema:
//  *               $ref: '#/components/schemas/Data'
//  *     responses:
//  *       200:
//  *         description: New data successfully added
//  *         content:
//  *           application/json:
//  *            schema:
//  *               $ref: '#/components/schemas/Data'
//  *       500:
//  *         description: Some server error
//  */
// router.put("/", urlencodedParser, function (req, res, next) {
//   data = {
//     id: req.body.id,
//     name: req.body.name
//   }
//   res.send(data)
// });


// /**
//  * @swagger
//  * /{id}:
//  *   delete:
//  *     summary: Delete the data by id
//  *     tags: [Index]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: number
//  *         required: true
//  *         description: The data id
//  *     responses:
//  *       200:
//  *         description: The data successfully deleted
//  *       404:
//  *         description: The book was not found
//  */
// router.delete("/:id", function (req, res, next) {
//   res.send(req.params.id)
// })


// module.exports = router;
