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
 *           description: Id number. Automatic generated
 *         first_name:
 *           type: string
 *           description: User's first name.
 *         last_name:
 *           type: string
 *           description: User's last name. 
 *         email:
 *           type: string
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
 *           type: string
 *           description: User's email.
 *         password:
 *           type: string
 *           description: User's password.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ForgotPassword:
 *       type: object
 *       required:
 *          email
 *       properties:
 *         email:
 *           type: string
 *           description: User's email.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CheckCode:
 *       type: object
 *       required:
 *          email
 *          code
 *       properties:
 *         email:
 *           type: string
 *           description: User's email.
 *         code:
 *           type: string
 *           description: The code that system sent the user for changing password
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ChangePassword:
 *       type: object
 *       required:
 *          email
 *          password
 *          passwordAgain
 *          code
 *       properties:
 *         email:
 *           type: string
 *           description: User's email.
 *         password:
 *           type: string
 *           description: New password
 *         passwordAgain:
 *           type: string
 *           description: For check the password
 */

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


/**
 * @swagger
 * /auth/forgot_password:
 *   post:
 *      summary: Change password
 *      tags: [auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/ForgotPassword'
 *      responses:
 *          200:
 *              description: Successful
 */
router.post("/forgot_password", urlencodedParser, async function (req, res, next) {
    var service = new AuthService();
    const authObj = {
        email: req.body.email,
    };
    var result = await service.forgotPassword(authObj);
    res.send(result);
});

/**
 * @swagger
 * /auth/check_code:
 *   post:
 *      summary: Check forgot password code
 *      tags: [auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/CheckCode'
 *      responses:
 *          200:
 *              description: Successful
 */
router.post("/check_code", urlencodedParser, async function (req, res, next) {
    var service = new AuthService();
    const authObj = {
        email: req.body.email,
        code: req.body.code,
    };
    var result = await service.checkCode(authObj);
    res.send(result);
});

/**
 * @swagger
 * /auth/change_password:
 *   post:
 *      summary: Change password
 *      tags: [auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/ChangePassword'
 *      responses:
 *          200:
 *              description: Successful
 */
router.post("/change_password", urlencodedParser, async function (req, res, next) {
    var service = new AuthService();
    const authObj = {
        email: req.body.email,
        password: req.body.password,
        password_again: req.body.passwordAgain,
    };
    var result = await service.changePassword(authObj);
    res.send(result);
});


module.exports = router;
