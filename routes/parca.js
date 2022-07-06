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
 * /parca/:
 *   get:
 *     summary: Sistemde kayıtlı bütün parçaları getirir
 *     tags: [parcalar]
 *     responses:
 *       200:
 *         description: Tüm data döner
 */
router.get("/", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new ParcaService();
    const response = await service.getAll();
    res.send(response);
});


/**
 * @swagger
 * /parca/{id}:
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
 *     responses:
 *       200:
 *         description: Gerekli data gelir
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parca'
 *       404:
 *         description: Data bulunamadı
 */
router.get('/:id', async function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // res.send(req.params.id)
    var service = new ParcaService();
    var response = await service.getById(req.params.id);
    res.send(response);
});


/**
 * @swagger
 * /parca/:
 *   post:
 *     summary: Parçalar tablosuna yeni parça ekle
 *     tags: [parcalar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               $ref: '#/components/schemas/Parca'
 *     responses:
 *       200:
 *         description: Yeni parça başarıyla eklendi
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Parca'
 *       500:
 *         description: Server hatası
 */
router.post("/", urlencodedParser, async function (req, res, next) {
    var service = new ParcaService();
    const parcaObj = new ParcaObject();
    parcaObj.cihazId = req.body.cihazId;
    parcaObj.kategoriId = req.body.kategoriId;
    parcaObj.parcaAdi = req.body.parcaAdi;

    var result = await service.add(parcaObj);
    res.send(result);
});


/**
 * @swagger
 * /parca/:
 *   put:
 *     summary: Id numarasına göre parçaları güncelle
 *     tags: [parcalar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *               $ref: '#/components/schemas/Parca'
 *     responses:
 *       200:
 *         description: Data başarıyla güncellendi
 *         content:
 *           application/json:
 *            schema:
 *               $ref: '#/components/schemas/Parca'
 *       500:
 *         description: Server hatası
 */
router.put("/", urlencodedParser, async function (req, res, next) {
    var service = new ParcaService();
    const parcaObj = new ParcaObject();
    parcaObj.id = req.body.id;
    parcaObj.cihazId = req.body.cihazId;
    parcaObj.kategoriId = req.body.kategoriId;
    parcaObj.parcaAdi = req.body.parcaAdi;
    parcaObj.durum = req.body.durum;

    var result = await service.update(parcaObj);
    res.send(result);
});


/**
 * @swagger
 * /parca/{id}:
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
 *     responses:
 *       200:
 *         description: Veri başarıyla silindi
 *       404:
 *         description: Veri bulunamadı
 */
router.delete("/:id", async function (req, res, next) {
    var service = new ParcaService();
    var result = await service.delete(req.params.id);
    res.send(result);
})


/**
 * @swagger
 * /parca/durum/{durum}:
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
 *     responses:
 *       200:
 *         description: Gerekli veri döner
 */
 router.get('/durum/:durum', async function (req, res, next) {
    var service = new ParcaService();
    var response = await service.getAllByDurum(req.params.durum);
    res.send(response);
});


/**
 * @swagger
 * /parca/tarih/{startDate}/{endDate}:
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
 *     responses:
 *       200:
 *         description: Gerekli veri döner
 */
 router.get('/tarih/:startDate/:endDate', async function (req, res, next) {
    var service = new ParcaService();
    var response = await service.getAllByDate(req.params.startDate, req.params.endDate);
    res.send(response);
});

/**
 * @swagger
 * /parca/kategori/{kategoriId}:
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
 *     responses:
 *       200:
 *         description: Gerekli veri döner
 */
 router.get('/kategori/:kategoriId', async function (req, res, next) {
    var service = new ParcaService();
    var response = await service.getAllByCategory(req.params.kategoriId);
    res.send(response);
});


module.exports = router;
