var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const SecurityAspectHelper = require('../core/utilities/security/securityAspectHelper');
const MotionSensorService = require('../business/motion_sensor_service');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     MotionSensor:
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
 *         timestamp:
 *           type: string
 *           description: Timestamp. Automatic generated.
 */


/**
 * @swagger
 * tags:
 *   name: motionSensors
 *   description: Motion Sensor
 */

/**
 * @swagger
 * /motions/get_motion_devices:
 *   get:
 *     summary: Get all devices
 *     tags: [motionSensors]
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/get_motion_devices", async function (req, res, next) {
    const service = new MotionSensorService();
    const securityAspectHelper = new SecurityAspectHelper();
    const methodName = "getMotionDevices";

    const result = await securityAspectHelper.help(service, methodName, req.headers.authorization);
    if (result.success === false) return res.send(result);

    const response = await service.getMotionDevices(result.extractResponse.data, result.operationOperationClaims.data);
    res.send(response);
});


/**
 * @swagger
 * /motions/get_all_motions:
 *   get:
 *     summary: Get all motions in the room
 *     tags: [motionSensors]
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/get_all_motions", async function (req, res, next) {
    const service = new MotionSensorService();
    const securityAspectHelper = new SecurityAspectHelper();
    const methodName = "getAllMotions";

    const result = await securityAspectHelper.help(service, methodName, req.headers.authorization);
    if (result.success === false) return res.send(result);

    const response = await service.getAllMotions(result.extractResponse.data, result.operationOperationClaims.data);
    res.send(response);
});


/**
 * @swagger
 * /motions/get_all_motions_by_device/{deviceId}:
 *   get:
 *     summary: Get all motions by device
 *     tags: [motionSensors]
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
router.get('/get_all_motions_by_device/:deviceId', async function (req, res, next) {
    const service = new MotionSensorService();
    const securityAspectHelper = new SecurityAspectHelper();
    const methodName = "getAllMotionsByDevice";

    const result = await securityAspectHelper.help(service, methodName, req.headers.authorization);
    if (result.success === false) return res.send(result);

    var response = await service.getAllMotionsByDevice(result.extractResponse.data, result.operationOperationClaims.data, req.params.deviceId);
    res.send(response);
});

/**
 * @swagger
 * /motions:
 *   post:
 *      summary: Add new motion
 *      tags: [motionSensors]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/MotionSensor'
 *      responses:
 *          200:
 *              description: Successful
 */
router.post("/", urlencodedParser, async function (req, res, next) {
    var service = new MotionSensorService();
    const securityAspectHelper = new SecurityAspectHelper();
    const methodName = "addMotion";
    
    const result = await securityAspectHelper.help(service, methodName, req.headers.authorization);
    if (result.success === false) return res.send(result);
    console.log("route")

    const motionObj = {
        device_id: req.body.device_id,
        device_name: req.body.device_name,
    };
    var response = await service.addMotion(result.extractResponse.data, result.operationOperationClaims.data, motionObj);
    res.send(response);
});



module.exports = router;
