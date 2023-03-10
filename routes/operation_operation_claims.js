var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const methodInterceptor = require("../core/method_interceptor/method_interceptor");
const securityAspect = require("../core/aspects/security_aspect");
const extractToken = require("../core/utilities/security/extract_token");
const OperationOperationClaimService = require('../business/operation_operation_claim_service');

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     OperationOperationClaimAdd:
 *       type: object
 *       required:
 *         - operation_id
 *         - operation_claim_id
 *       properties:
 *         id:
 *           type: number
 *           description: Id number. Automatic generated.
 *         operation_id:
 *           type: number
 *           description: Operation Id.
 *         operation_claim_id:
 *           type: number
 *           description: Operation claim Id
 */


/**
 * @swagger
 * tags:
 *   name: operationOperationClaims
 *   description: OperationOperationClaim
 */

/**
 * @swagger
 * /operationOperationClaims/add:
 *   post:
 *     summary: Add a new operation operation claim
 *     tags: [operationOperationClaims]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/OperationOperationClaimAdd'
 *     responses:
 *       200:
 *         description: Successful
 */
router.post("/add", async function (req, res, next) {
    const service = new OperationOperationClaimService();
    const obj = {
        operation_id : req.body.operation_id,
        operation_claim_id : req.body.operation_claim_id,
    }

    const result = await service.addOperationOperationClaim(obj);
    res.send(result);
});

/**
 * @swagger
 * /operationOperationClaims/getAllDetails:
 *   get:
 *     summary: Get all with details
 *     tags: [operationOperationClaims]
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/getAllDetails", async function (req, res, next) {
    const service = new OperationOperationClaimService();

    const result = await service.getAllDetails();
    res.send(result);
});






module.exports = router;
