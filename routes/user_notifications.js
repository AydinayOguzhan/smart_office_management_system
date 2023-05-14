var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const UserNotificationService = require('../business/user_notification_service');


var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     UserNotification:
 *       type: object
 *       required:
 *          userId
 *          notificationId
 *          notificationMail
 *          notification
 *       properties:
 *         id:
 *           type: number
 *           description: Id number. Automatic generated.
 *         userId:
 *           type: number
 *           description: Id number of user.
 *         notificationId:
 *           type: number
 *           description: Id number of notification.
 *         notificationMail:
 *           type: string
 *           description: E-mail address to send notification.
 *         notification:
 *           type: boolean
 *           description: User's notification preference.
 */

/**
 * @swagger
 * tags:
 *   name: user_notifications
 *   description: User Notification
 */

/**
 * @swagger
 * /user_notifications/get_all:
 *   get:
 *     summary: Get all user notifications
 *     tags: [user_notifications]
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/get_all", async function (req, res, next) {
    var service = new UserNotificationService();
    const response = await service.getAll();
    res.send(response);
});

/**
 * @swagger
 * /user_notifications/get_all_details_by_email/{email}:
 *   get:
 *     summary: Get all notification details by user id 
 *     tags: [user_notifications]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User's email
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/get_all_details_by_email/:email", async function (req, res, next) {
    var service = new UserNotificationService();
    const response = await service.getAllDetailsByEmail(req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /user_notifications/add:
 *   post:
 *      summary: Add user notification
 *      tags: [user_notifications]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/UserNotification'
 *      responses:
 *          200:
 *              description: Successful
 */
router.post("/add", urlencodedParser, async function (req, res, next) {
    var service = new UserNotificationService();
    const obj = {
        id: req.body.id,
        userId: req.body.userId,
        notificationId: req.body.notificationId,
        notificationMail: req.body.notificationMail,
        notification: req.body.notification
    };
    var result = await service.add(obj);
    res.send(result);
});

/**
 * @swagger
 * /user_notifications/update:
 *   put:
 *      summary: Update user notification
 *      tags: [user_notifications]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/UserNotification'
 *      responses:
 *          200:
 *              description: Successful
 */
router.put("/update", urlencodedParser, async function (req, res, next) {
    var service = new UserNotificationService();
    const obj = {
        id: req.body.id,
        userId: req.body.userId,
        notificationId: req.body.notificationId,
        notificationMail: req.body.notificationMail,
        notification: req.body.notification
    };
    var result = await service.update(obj);
    res.send(result);
});

module.exports = router;
