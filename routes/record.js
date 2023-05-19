var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const multer = require("multer");
const RecordService = require('../business/record_service');


var urlencodedParser = bodyParser.urlencoded({ extended: false })

const upload = multer({dest: "public/records/"});

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Records:
//  *       type: object
//  *       required:
//  *         - device_id
//  *         - device_name
//  *       properties:
//  *         id:
//  *           type: string
//  *           description: Id number. Automatic generated.
//  *         device_id:
//  *           type: number
//  *           description: Device Id.
//  *         device_name:
//  *           type: string
//  *           description: Device name
//  *         temperature:
//  *           type: number
//  *           description: Temperature value from device.
//  *         humidity:
//  *           type: number
//  *           description: Humidity value from device.
//  *         timestamp:
//  *           type: string
//  *           description: Timestamp. Automatic generated.
//  */


/**
 * @swagger
 * tags:
 *   name: records
 *   description: Records
 */

/**
 * @swagger
 * /records/get_all:
 *   get:
 *     summary: Get all records
 *     tags: [records]
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/get_all", async function (req, res, next) {
    const service = new RecordService();
    const response = await service.getAll();
    res.send(response);
});


/**
 * @swagger
 * /records/get_all_date_range/{start_date}/{end_date}:
 *   get:
 *     summary: Get all records by specific date range
 *     tags: [records]
 *     parameters:
 *       - in: path
 *         name: start_date
 *         schema:
 *           type: string
 *         required: true
 *         description: Start date
 *       - in: path
 *         name: end_date
 *         schema:
 *           type: string
 *         required: true
 *         description: End date
 *     responses:
 *       200:
 *         description: Successful
 */
router.get("/get_all_date_range/:start_date/:end_date", async function (req, res, next) {
    const service = new RecordService();
    const response = await service.getAllDateRange(req.params.start_date, req.params.end_date);
    res.send(response);
});


/**
 * @swagger
 * /records:
 *   post:
 *      summary: Add new record
 *      tags: [records]
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: formData
 *          name: upfile
 *          type: file
 *          description: file
 *      responses:
 *          200:
 *              description: Successful
 */
router.post("/", upload.single("file") ,urlencodedParser, async function (req, res, next) {
    const service = new RecordService();
    const file= req.file;
    const document = {
        filename: file.originalname,
        mimeType: file.mimetype,
        path: file.path
    };

    const result = await service.add(document);
    res.send(result);
});



module.exports = router;
