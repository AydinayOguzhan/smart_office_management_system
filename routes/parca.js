var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const { response } = require('../app');
const ParcaService = require('../business/parca_service');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     Parca:
 *       type: object
 *       required:
 *         - cihazId
 *         - kategoriId
 *         - parcaAdi
 *       properties:
 *         id:
 *           type: number
 *           description: Parçanın Id numarası. Otomatik oluşturulur.
 *         cihazId:
 *           type: number
 *           description: Parçanın takılı olduğu cihazın Id numarası.
 *         kategoriId:
 *           type: number
 *           description: Parçanın ait olduğu kategorinin Id numarası.
 *         parcaAdi:
 *           type: string
 *           description: Parçaya verilmiş isim.
 *         eklenmeTarihi:
 *           type: string
 *           description: Parçanın sisteme eklendiği tarih. Otomatik atanır.
 *         durum:
 *           type: boolean
 *           description: Verinin aktif olup olmadığını gösteren alan. Otomatik atanır. 
 */

/**
 * @swagger
 * tags:
 *   name: parcalar
 *   description: Parcalar
 */

/**
 * @swagger
 * /parca/{userId}:
 *   get:
 *     summary: Tüm parçaları getirir
 *     tags: [parcalar]
 *     parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: number
 *        required: true
 *        description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.get("/:userId", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new ParcaService();
    const response = await service.getAll(req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /parca/without_durum/{userId}:
 *   get:
 *     summary: Sistemdeki silinmiş parçalar dahil bütün parçaları getirir
 *     tags: [parcalar]
 *     parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: number
 *        required: true
 *        description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get("/without_durum/:userId", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new ParcaService();
    const response = await service.getAllByWithoutDurum(req.params.userId);
    res.send(response);
});


/**
 * @swagger
 * /parca/{id}/{userId}:
 *   get:
 *     summary: Parçanın Id numarasına göre parçayı getir
 *     tags: [parcalar]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Parçaya ait Id numarası
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.get('/:id/:userId', async function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // res.send(req.params.id)
    var service = new ParcaService();
    var response = await service.getById(req.params.id, req.params.userId);
    res.send(response);
});


/**
 * @swagger
 * /parca/{userId}:
 *   post:
 *      summary: Parçalar tablosuna yeni parça ekle
 *      tags: [parcalar]
 *      parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Parca'
 *      responses:
 *          200:
 *              description: İşlem başarılı
 */
router.post("/:userId", urlencodedParser, async function (req, res, next) {
    var service = new ParcaService();
    const parcaObj = {
        cihazId: req.body.cihazId,
        kategoriId: req.body.kategoriId,
        parcaAdi: req.body.parcaAdi,
    };

    var result = await service.add(parcaObj, req.params.userId);
    res.send(result);
});


/**
 * @swagger
 * /parca/{userId}:
 *   put:
 *      summary: Parçalar tablosundaki bir parçayı güncelle
 *      tags: [parcalar]
 *      parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Parca'
 *      responses:
 *          200:
 *              description: İşlem başarılı
 */
router.put("/:userId", urlencodedParser, async function (req, res, next) {
    var service = new ParcaService();
    const parcaObj = {
        id: req.body.id,
        cihazId: req.body.cihazId,
        kategoriId: req.body.kategoriId,
        parcaAdi: req.body.parcaAdi,
        durum: req.body.durum,
    };

    var result = await service.update(parcaObj, req.params.userId);
    res.send(result);
});


/**
 * @swagger
 * /parca/{id}/{userId}:
 *   delete:
 *     summary: Parçayı sil
 *     tags: [parcalar]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Parçaya ait Id numarası
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.delete("/:id/:userId", async function (req, res, next) {
    var service = new ParcaService();
    var result = await service.delete(req.params.id, req.params.userId);
    res.send(result);
})


/**
 * @swagger
 * /parca/durum/{durum}/{userId}:
 *   get:
 *     summary: İsteğe göre silinmiş veya silinmemiş parçaları getir
 *     tags: [parcalar]
 *     parameters:
 *       - in: path
 *         name: durum
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Parçaya ait durum bilgisi
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.get('/durum/:durum/:userId', async function (req, res, next) {
    var service = new ParcaService();
    var response = await service.getAllByDurum(req.params.durum, req.params.userId);
    res.send(response);
});


/**
 * @swagger
 * /parca/tarih/{startDate}/{endDate}/{userId}:
 *   get:
 *     summary: Tarih aralığına göre parçaları getir
 *     tags: [parcalar]
 *     parameters:
 *       - in: path
 *         name: startDate
 *         schema:
 *           type: string
 *         required: true
 *         description: Parçaya ait eklenme tarihi bilgisi
 *       - in: path
 *         name: endDate
 *         schema:
 *           type: string
 *         required: true
 *         description: Parçaya ait eklenme tarihi bilgisi
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.get('/tarih/:startDate/:endDate/:userId', async function (req, res, next) {
    var service = new ParcaService();
    var response = await service.getAllByDate(req.params.startDate, req.params.endDate, req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /parca/kategori/{kategoriId}/{userId}:
 *   get:
 *     summary: Seçilen kategoriye göre parçaları getir
 *     tags: [parcalar]
 *     parameters:
 *       - in: path
 *         name: kategoriId
 *         schema:
 *           type: number
 *         required: true
 *         description: Parçaya ait kategori Id numarası
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.get('/kategori/:kategoriId/:userId', async function (req, res, next) {
    var service = new ParcaService();
    var response = await service.getAllByCategory(req.params.kategoriId, req.params.userId);
    res.send(response);
});

/**
 * @swagger
 * /parca/cihaz/{cihazId}/{userId}:
 *   get:
 *     summary: Cihazın Id numarasına göre üzerinde takılı parçaları getir
 *     tags: [parcalar]
 *     parameters:
 *       - in: path
 *         name: cihazId
 *         schema:
 *           type: number
 *         required: true
 *         description: Parçaya ait cihaz Id numarası
 *       - in: path
 *         name: userId
 *         schema:
 *           type: number
 *         required: true
 *         description: Kullanıcıya ait Id numarası
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.get('/cihaz/:cihazId/:userId', async function (req, res, next) {
    var service = new ParcaService();
    var response = await service.getAllByCihaz(req.params.cihazId, req.params.userId);
    res.send(response);
});


module.exports = router;
