var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const AuthService = require("../business/auth_service");


var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *          first_name
 *          last_name
 *          email
 *          password
 *       properties:
 *         id:
 *           type: string
 *           description: Id numarası. Otomatik oluşturulur.
 *         first_name:
 *           type: string
 *           description: User's first name.
 *         last_name:
 *           type: string
 *           description: User's last name. 
 *         email:
 *           type: email
 *           description: User's email.
 *         password:
 *           type: string
 *           description: User's password.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *          email
 *          password
 *       properties:
 *         email:
 *           type: email
 *           description: User's email.
 *         password:
 *           type: string
 *           description: User's password.
 */

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Auth
 */

// /**
//  * @swagger
//  * /readings/get_devices:
//  *   get:
//  *     summary: Get all devices
//  *     tags: [readings]
//  *     responses:
//  *       200:
//  *         description: Successful
//  */
// router.get("/get_devices", async function (req, res, next) {
//     var service = new ReadingService();
//     const response = await service.getDevices();
//     res.send(response);
// });


// /**
//  * @swagger
//  * /readings/get_temperatures_by_device/{deviceId}:
//  *   get:
//  *     summary: Get device temperatures
//  *     tags: [readings]
//  *     parameters:
//  *      - in: path
//  *        name: deviceId
//  *        schema:
//  *          type: number
//  *        required: true
//  *        description: Device Id
//  *     responses:
//  *       200:
//  *         description: İşlem başarılı
//  */
//  router.get("/get_temperatures_by_device/:deviceId", async function (req, res, next) {
//     var service = new ReadingService();
//     const response = await service.getTemperaturesByDevice(req.params.deviceId);
//     res.send(response);
// });



/**
 * @swagger
 * /auth/register:
 *   post:
 *      summary: Register to the system
 *      tags: [auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Register'
 *      responses:
 *          200:
 *              description: Successful
 */
router.post("/register", urlencodedParser, async function (req, res, next) {
    var service = new AuthService();
    const authObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
    };
    var result = await service.register(authObj);
    res.send(result);
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *      summary: Login to the system
 *      tags: [auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: Successful
 */
router.post("/login", urlencodedParser, async function (req, res, next) {
    var service = new AuthService();
    const authObj = {
        email: req.body.email,
        password: req.body.password,
    };
    var result = await service.login(authObj);
    res.send(result);
});

//TODO: Consider adding forgot password and changing password normally


module.exports = router;
