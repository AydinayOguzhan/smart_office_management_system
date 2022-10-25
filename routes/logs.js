var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const { response } = require('../app');
const LogService = require('../business/log_service');


var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     ServerLogs:
 *       type: object
 *       required:
 *         - id
 *         - level
 *         - time_stamp
 *         - message
 *       properties:
 *         id:
 *           type: number
 *           description: Log'a ait Id numarası
 *         level:
 *           type: string
 *           description: Log'a ait level.
 *         time_stamp:
 *           type: string
 *           description: Log'un oluşturulduğu tarih.
 *         message:
 *           type: string
 *           description: Log mesajı.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Exception-RejectionLogs:
 *       type: object
 *       required:
 *         - id
 *         - level
 *         - time_stamp
 *         - message
 *         - error
 *       properties:
 *         id:
 *           type: number
 *           description: Log'a ait Id numarası
 *         level:
 *           type: string
 *           description: Log'a ait level.
 *         time_stamp:
 *           type: string
 *           description: Log'un oluşturulduğu tarih.
 *         message:
 *           type: string
 *           description: Log mesajı.
 *         error:
 *           type: string
 *           description: Hata mesajı
 */


/**
 * @swagger
 * tags:
 *   name: loglar
 *   description: Loglar
 */

/**
 * @swagger
 * /loglar/server/{userId}:
 *   get:
 *     summary: Tüm server loglarını getirir
 *     tags: [loglar]
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
router.get("/server/:userId", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new LogService();
    const response = await service.getAllServerLogs(req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /loglar/exception/{userId}:
 *   get:
 *     summary: Tüm exception loglarını getirir
 *     tags: [loglar]
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
 router.get("/exception/:userId", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new LogService();
    const response = await service.getAllExceptionLogs(req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /loglar/rejection/{userId}:
 *   get:
 *     summary: Tüm rejection loglarını getirir
 *     tags: [loglar]
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
 router.get("/rejection/:userId", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new LogService();
    const response = await service.getAllRejectionLogs(req.params.userId);
    res.send(response);
});


module.exports = router;
