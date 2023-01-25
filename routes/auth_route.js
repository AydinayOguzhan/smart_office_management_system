const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const AuthService = require("../business/auth_service");

const urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Kullanıcıya ait email adresi.
 */

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Auth route
 */

/**
 * @swagger
 * /auth/{email}:
 *   get:
 *     summary: Sisteme giriş yap.
 *     tags: [auth]
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
router.get("/:email", async function (req, res, next) {
    let service = new AuthService();
    const token = await service.login(req.params.email);
    res.send(token);
});

module.exports = router;