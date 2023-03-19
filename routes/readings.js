var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const ReadingService = require("../business/reading_service");
const methodInterceptor = require("../core/method_interceptor/method_interceptor");
const securityAspect = require("../core/aspects/security_aspect");
const extractToken = require("../core/utilities/security/extract_token");
const OperationOperationClaimService = require('../business/operation_operation_claim_service');
const SecurityAspectHelper = require('../core/utilities/security/securityAspectHelper');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


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
 *           description: Id number. Automatic generated.
 *         device_id:
 *           type: number
 *           description: Device Id.
 *         device_name:
 *           type: string
 *           description: Device name
 *         temperature:
 *           type: number
 *           description: Temperature value from device.
 *         humidity:
 *           type: number
 *           description: Humidity value from device.
 *         timestamp:
 *           type: string
 *           description: Timestamp. Automatic generated.
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
    const service = new ReadingService();
    const securityAspectHelper = new SecurityAspectHelper();
    const methodName = "getDevices";

    const result = await securityAspectHelper.help(service, methodName, req.headers.authorization);
    if (result.success === false) return res.send(result);

    const response = await service.getDevices(result.extractResponse.data, methodName, result.operationOperationClaims.data);
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
 *         description: Successful
 */
router.get("/get_temperatures_by_device/:deviceId", async function (req, res, next) {
    const service = new ReadingService();
    const securityAspectHelper = new SecurityAspectHelper();
    const methodName = "getTemperaturesByDevice";

    const result = await securityAspectHelper.help(service, methodName, req.headers.authorization);
    if (result.success === false) return res.send(result);

    const response = await service.getTemperaturesByDevice(result.extractResponse.data, methodName, result.operationOperationClaims.data, req.params.deviceId);
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
 *         description: Successful
 */
router.get('/get_humidities_by_device/:deviceId', async function (req, res, next) {
    const service = new ReadingService();
    const securityAspectHelper = new SecurityAspectHelper();
    const methodName = "getHumiditiesByDevice";

    const result = securityAspectHelper.help(service, methodName, req.headers.authorization);
    if (result.success === false) return res.send(result);
    
    var response = await service.getHumiditiesByDevice(result.extractResponse.data, methodName, result.operationOperationClaims.data, req.params.deviceId);
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
 *              description: Successful
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



module.exports = router;
