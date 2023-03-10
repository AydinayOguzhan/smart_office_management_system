var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const methodInterceptor = require("../core/method_interceptor/method_interceptor");
const securityAspect = require("../core/aspects/security_aspect");
const extractToken = require("../core/utilities/security/extract_token");
const OperationService = require('../business/operation_service');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     OperationAdd:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: number
 *           description: Id number. Automatic generated.
 *         name:
 *           type: string
 *           description: Operation name.
 */


/**
 * @swagger
 * tags:
 *   name: operations
 *   description: Operations
 */

/**
 * @swagger
 * /operations/:
 *   post:
 *     summary: Add a new operation 
 *     tags: [operations]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/OperationAdd'
 *     responses:
 *       200:
 *         description: Successful
 */
router.post("/", async function (req, res, next) {
    const service = new OperationService();
    const obj = {
        name : req.body.name,
    }

    const result = await service.add(obj);
    res.send(result);
});

/**
 * @swagger
 * /operations/getAll:
 *   get:
 *     summary: Get all 
 *     tags: [operations]
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/getAll", async function (req, res, next) {
    const service = new OperationService();

    const result = await service.getall();
    res.send(result);
});






module.exports = router;
