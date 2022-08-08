var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const { response } = require('../app');
const ParcaService = require('../business/parca_service');
const ParcaObject = require('../entities/parca_object');
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
 *     summary: Sistemde kayıtlı bütün parçaları getirir
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
 *         description: Tüm data döner
 */
 router.get("/:userId", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new ParcaService();
    const response = await service.getAll(req.params.userId);
    res.send(response);
});


/**
 * @swagger
 * /parca/{id}/{userId}:
 *   get:
 *     summary: Id'ye göre parçayı getir
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
 *         description: Gerekli data gelir
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
 *      summary: Parçalar tablosuna yeni cihaz ekle
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
 *              description: Ekleme işlemi başarılı
 *          500: 
 *              description: Server hatası
 */
router.post("/:userId", urlencodedParser, async function (req, res, next) {
    var service = new ParcaService();
    const parcaObj = new ParcaObject();
    parcaObj.cihazId = req.body.cihazId;
    parcaObj.kategoriId = req.body.kategoriId;
    parcaObj.parcaAdi = req.body.parcaAdi;

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
 *              description: Ekleme işlemi başarılı
 *          500: 
 *              description: Server hatası
 */
 router.put("/:userId", urlencodedParser, async function (req, res, next) {
    var service = new ParcaService();
    const parcaObj = new ParcaObject();
    parcaObj.id = req.body.id;
    parcaObj.cihazId = req.body.cihazId;
    parcaObj.kategoriId = req.body.kategoriId;
    parcaObj.parcaAdi = req.body.parcaAdi;
    parcaObj.durum = req.body.durum;

    var result = await service.update(parcaObj, req.params.userId);
    res.send(result);
});


/**
 * @swagger
 * /parca/{id}/{userId}:
 *   delete:
 *     summary: Id numarasına göre verinin durumunu false yap
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
 *         description: Veri başarıyla silindi
 *       404:
 *         description: Veri bulunamadı
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
 *     summary: Sistemde ekli bütün parçaları durum alanına göre getirir
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
 *         description: Gerekli veri döner
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
 *     summary: Sistemde ekli bütün parçaları tarih aralığına göre getirir
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
 *         description: Gerekli veri döner
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
 *     summary: Sistemde ekli bütün parçaları kategori alanına göre getirir
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
 *         description: Gerekli veri döner
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
 *     summary: Cihazlar üzerine takılı bütün parçaları getirir
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
 *         description: Gerekli veri döner
 */
 router.get('/cihaz/:cihazId/:userId', async function (req, res, next) {
    var service = new ParcaService();
    var response = await service.getAllByCihaz(req.params.cihazId, req.params.userId);
    res.send(response);
});


module.exports = router;
