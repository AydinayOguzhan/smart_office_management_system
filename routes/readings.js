var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const ReadingService = require("../business/reading_service");


var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     Readings:
 *       type: object
 *       required:
 *         - device_id
 *         - device_name
 *       properties:
 *         id:
 *           type: string
 *           description: Id numarası. Otomatik oluşturulur.
 *         device_id:
 *           type: number
 *           description: Cihaza ait id numarası.
 *         device_name:
 *           type: string
 *           description: Cihaza verilen isim
 *         temperature:
 *           type: number
 *           description: Cihazın bulunduğu ortamdaki sıcaklık değeri.
 *         humidity:
 *           type: number
 *           description: Cihazın bulunduğu ortamdaki nem miktarı değeri.
 *         voice:
 *           type: number
 *           description: Cihazın bulunduğu bulunduğu ortamdaki gürültü miktarı değeri.
 *         timestamp:
 *           type: string
 *           description: Ölçümün sisteme eklendiği tarih. Otomatik atanır.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReadingsAdd:
 *       type: object
 *       required:
 *         - device_id
 *         - device_name
 *       properties:
 *         id:
 *           type: string
 *           description: Id numarası. Otomatik oluşturulur.
 *         device_id:
 *           type: number
 *           description: Cihaza ait id numarası.
 *         device_name:
 *           type: string
 *           description: Cihaza verilen isim
 *         temperature:
 *           type: number
 *           description: Cihazın bulunduğu ortamdaki sıcaklık değeri.
 *         humidity:
 *           type: number
 *           description: Cihazın bulunduğu ortamdaki nem miktarı değeri.
 *         timestamp:
 *           type: string
 *           description: Ölçümün sisteme eklendiği tarih. Otomatik atanır.
 */


/**
 * @swagger
 * tags:
 *   name: readings
 *   description: Readings
 */

/**
 * @swagger
 * /readings/get_devices:
 *   get:
 *     summary: Get all devices
 *     tags: [readings]
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/get_devices", async function (req, res, next) {
    var service = new ReadingService();
    const response = await service.getDevices();
    res.send(response);
});


/**
 * @swagger
 * /readings/get_temperatures_by_device/{deviceId}:
 *   get:
 *     summary: Get device temperatures
 *     tags: [readings]
 *     parameters:
 *      - in: path
 *        name: deviceId
 *        schema:
 *          type: number
 *        required: true
 *        description: Device Id
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get("/get_temperatures_by_device/:deviceId", async function (req, res, next) {
    var service = new ReadingService();
    const response = await service.getTemperaturesByDevice(req.params.deviceId);
    res.send(response);
});


/**
 * @swagger
 * /readings/get_humidities_by_device/{deviceId}:
 *   get:
 *     summary: Get device humidities
 *     tags: [readings]
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         schema:
 *           type: number
 *         required: true
 *         description: Device Id
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.get('/get_humidities_by_device/:deviceId', async function (req, res, next) {
    var service = new ReadingService();
    var response = await service.getHumiditiesByDevice(req.params.deviceId);
    res.send(response);
});

/**
 * @swagger
 * /readings:
 *   post:
 *      summary: Add new reading
 *      tags: [readings]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/ReadingsAdd'
 *      responses:
 *          200:
 *              description: İşlem başarılı
 */
router.post("/", urlencodedParser, async function (req, res, next) {
    var service = new ReadingService();
    const readingsObj = {
        device_id: req.body.device_id,
        device_name: req.body.device_name,
        temperature: req.body.temperature,
        humidity: req.body.humidity
    };
    var result = await service.addReading(readingsObj);
    res.send(result);
});



/**
 * @swagger
 * /readings/get_voices_by_device/{deviceId}:
 *   get:
 *     summary: Get device voices
 *     tags: [readings]
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         schema:
 *           type: number
 *         required: true
 *         description: Cihazın Id numarası
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/get_voices_by_device/:deviceId', async function (req, res, next) {
    var service = new ReadingService();
    var response = await service.getVoicesByDevice(req.params.deviceId);
    res.send(response);
});



module.exports = router;
