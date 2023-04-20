var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const NotificationService = require('../business/notification_service');


var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *          name
 *       properties:
 *         id:
 *           type: string
 *           description: Id number. Automatic generated.
 *         name:
 *           type: string
 *           description: The name of the notification.
 */

/**
 * @swagger
 * tags:
 *   name: notification
 *   description: Notification
 */

/**
 * @swagger
 * /notifications/get_all:
 *   get:
 *     summary: Get all notifications
 *     tags: [notification]
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/get_all", async function (req, res, next) {
    var service = new NotificationService();
    const response = await service.getAll();
    res.send(response);
});


/**
 * @swagger
 * /notifications/add:
 *   post:
 *      summary: Add notification
 *      tags: [notification]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Notification'
 *      responses:
 *          200:
 *              description: Successful
 */
router.post("/add", urlencodedParser, async function (req, res, next) {
    var service = new NotificationService();
    const obj = {
        name: req.body.name,
    };
    var result = await service.add(obj);
    res.send(result);
});


module.exports = router;
