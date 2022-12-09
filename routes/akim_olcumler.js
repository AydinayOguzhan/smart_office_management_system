var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const { response } = require('../app');
const AkimOlcumService = require("../business/akim_olcumler_service");

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @swagger
 * components:
 *   schemas:
 *     Akim_Olcum:
 *       type: object
 *       required:
 *         - cihaz_id
 *         - duman
 *         - sicaklik
 *         - nem
 *         - akim
 *         - meksis_kod
 *         - bina_id
 *         - kampus_id
 *       properties:
 *         id:
 *           type: string
 *           description: Ölçümün Id numarası. Otomatik oluşturulur.
 *         cihaz_id:
 *           type: number
 *           description: Ölçümün ait olduğu cihazın Id numarası.
 *         duman:
 *           type: number
 *           description: Cihazın bulunduğu alandaki duman durumu.
 *         sicaklik:
 *           type: number
 *           description: Cihazın bulunduğu ortamdaki sıcaklık değeri.
 *         nem:
 *           type: number
 *           description: Cihazın bulunduğu ortamdaki nem miktarı değeri.
 *         akim:
 *            type: number
 *            description: Cihazın ölçtüğü akım bilgisi
 *         eklenme_tarihi:
 *           type: string
 *           description: Ölçümün sisteme eklendiği tarih. Otomatik atanır.
 *         durum:
 *           type: boolean
 *           description: Verinin aktif olup olmadığını gösteren alan. Otomatik atanır. 
 *         meksis_kod:
 *           type: string
 *           description: Meksis kod.
 *         bina_id:
 *           type: string
 *           description: Cihazın bulunduğu binanın Id numarası.
 *         kampus_id:
 *           type: string
 *           description: Cihazın bulunduğu kampüsün Id numarası.
 */

/**
 * @swagger
 * tags:
 *   name: akim_olcumler
 *   description: Akım Ölçümler
 */

/**
 * @swagger
 * /akim_olcum/{email}:
 *   get:
 *     summary: Tüm akım ölçümlerini getir
 *     tags: [akim_olcumler]
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
    // res.render('index', { title: 'Express' }); 
    var service = new AkimOlcumService();
    const response = await service.getAll(req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /akim_olcum/without_durum/{email}:
 *   get:
 *     summary: Sistemdeki silinmiş ölçümler dahil bütün ölçümleri getir
 *     tags: [akim_olcumler]
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
 router.get("/without_durum/:email", async function (req, res, next) {
    // res.render('index', { title: 'Express' }); 
    var service = new AkimOlcumService();
    const response = await service.getAllByWithoutDurum(req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /akim_olcum/{id}/{email}:
 *   get:
 *     summary: Ölçümün Id numarasına göre ölçümü getirir
 *     tags: [akim_olcumler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ölçüme ait Id numarası
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.get('/:id/:email', async function (req, res, next) {
    // res.render('index', { title: 'Express' });
    // res.send(req.params.id)
    var service = new AkimOlcumService();
    var response = await service.getById(req.params.id, req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /akim_olcum/{email}:
 *   post:
 *      summary: Akım ölçümler tablosuna yeni ölçüm ekle
 *      tags: [akim_olcumler]
 *      parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Akim_Olcum'
 *      responses:
 *          200:
 *              description: İşlem başarılı
 */
router.post("/:email", urlencodedParser, async function (req, res, next) {
    var service = new AkimOlcumService();
    const olcumObj = {
        cihaz_id: req.body.cihaz_id,
        duman: req.body.duman,
        sicaklik: req.body.sicaklik,
        nem: req.body.nem,
        akim: req.body.akim,
        meksis_kod: req.body.meksis_kod,
        bina_id: req.body.bina_id,
        kampus_id: req.body.kampus_id
    };
    var result = await service.add(olcumObj, req.params.email);
    res.send(result);
});



/**
 * @swagger
 * /akim_olcum/{id}/{email}:
 *   delete:
 *     summary: Ölçümü sil
 *     tags: [akim_olcumler]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ölçüme ait Id numarası
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
router.delete("/:id/:email", async function (req, res, next) {
    var service = new AkimOlcumService();
    var result = await service.delete(req.params.id, req.params.email);
    res.send(result);
})


/**
 * @swagger
 * /akim_olcum/cihaz/{cihazId}/{email}:
 *   get:
 *     summary: Cihazın Id numarasına göre cihaza ait ölçümleri getirir
 *     tags: [akim_olcumler]
 *     parameters:
 *       - in: path
 *         name: cihazId
 *         schema:
 *           type: number
 *         required: true
 *         description: Cihazın Id numarası
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/cihaz/:cihazId/:email', async function (req, res, next) {
    var service = new AkimOlcumService();
    var response = await service.getAllByCihazId(req.params.cihazId, req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /akim_olcum/sicaklik/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa göre sıcaklık ölçümlerini getirir
 *     tags: [akim_olcumler]
 *     parameters:
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Sıcaklığın alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Sıcaklığın üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/sicaklik/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new AkimOlcumService();
    var response = await service.getAllBySicaklik(req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /akim_olcum/meksisSicaklik/{meksis_kod}/{bina_id}/{kampus_id}/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa ve meksis koda göre sıcaklık ölçümlerini getirir
 *     tags: [akim_olcumler]
 *     parameters:
 *       - in: path
 *         name: meksis_kod
 *         schema:
 *           type: string
 *         required: true
 *         description: Meksis kod
 *       - in: path
 *         name: bina_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Binaya ait Id numarası
 *       - in: path
 *         name: kampus_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kampüse ait Id numarası
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Sıcaklığın alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Sıcaklığın üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/meksisSicaklik/:meksis_kod/:bina_id/:kampus_id/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new AkimOlcumService();
    var response = await service.getAllBySicaklikMeksis(req.params.meksis_kod, req.params.bina_id, req.params.kampus_id,
        req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /akim_olcum/nem/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa göre nem ölçümlerini getirir
 *     tags: [akim_olcumler]
 *     parameters:
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Nemin alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Nemin üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/nem/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new AkimOlcumService();
    var response = await service.getAllByNem(req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /akim_olcum/meksisNem/{meksis_kod}/{bina_id}/{kampus_id}/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa ve meksis koda göre nem ölçümlerini getirir
 *     tags: [akim_olcumler]
 *     parameters:
 *       - in: path
 *         name: meksis_kod
 *         schema:
 *           type: string
 *         required: true
 *         description: Meksis kod
 *       - in: path
 *         name: bina_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Binaya ait Id numarası
 *       - in: path
 *         name: kampus_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kampüse ait Id numarası
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Nemin alt limiti
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Nemin üst limiti
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/meksisNem/:meksis_kod/:bina_id/:kampus_id/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new AkimOlcumService();
    var response = await service.getAllByNemMeksis(req.params.meksis_kod, req.params.bina_id, req.params.kampus_id,
        req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});


/**
 * @swagger
 * /akim_olcum/akim/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa göre akım ölçümlerini getirir
 *     tags: [akim_olcumler]
 *     parameters:
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Akım alt limit
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Akım üst limit
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/akim/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new AkimOlcumService();
    var response = await service.getAllByAkim(req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /akim_olcum/meksisAkim/{meksis_kod}/{bina_id}/{kampus_id}/{loverLimit}/{upperLimit}/{email}:
 *   get:
 *     summary: Belirlenen aralığa ve meksis koda göre akım ölçümlerini getirir
 *     tags: [akim_olcumler]
 *     parameters:
 *       - in: path
 *         name: meksis_kod
 *         schema:
 *           type: string
 *         required: true
 *         description: Meksis kod
 *       - in: path
 *         name: bina_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Binaya ait Id numarası
 *       - in: path
 *         name: kampus_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kampüse ait Id numarası
 *       - in: path
 *         name: loverLimit
 *         schema:
 *           type: number
 *         required: true
 *         description: Akım alt limit
 *       - in: path
 *         name: upperLimit
 *         schema:
 *            type: number
 *         required: true
 *         description: Nem üst limit
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/meksisAkim/:meksis_kod/:bina_id/:kampus_id/:loverLimit/:upperLimit/:email', async function (req, res, next) {
    var service = new AkimOlcumService();
    var response = await service.getAllByAkimMeksis(req.params.meksis_kod, req.params.bina_id, req.params.kampus_id,
        req.params.loverLimit, req.params.upperLimit, req.params.email);
    res.send(response);
});

/**
 * @swagger
 * /akim_olcum/meksis/{meksis_kod}/{bina_id}/{kampus_id}/{email}:
 *   get:
 *     summary: Meksis koda göre ölçüm getirme
 *     tags: [akim_olcumler]
 *     parameters:
 *       - in: path
 *         name: meksis_kod
 *         schema:
 *           type: string
 *         required: true
 *         description: Meksis kod
 *       - in: path
 *         name: bina_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Binaya ait Id numarası
 *       - in: path
 *         name: kampus_id
 *         schema:
 *           type: string
 *         required: false
 *         description: Kampus ait Id numarası
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Kullanıcıya ait email
 *     responses:
 *       200:
 *         description: İşlem başarılı
 */
 router.get('/meksis/:meksis_kod/:bina_id/:kampus_id/:email', async function (req, res, next) {
    var service = new AkimOlcumService();
    // console.log("endpoint",req.params.meksis_kod, req.params.bina_id, req.params.kampus_id);
    var response = await service.getAllByMeksis(req.params.meksis_kod, req.params.bina_id, req.params.kampus_id, req.params.email);
    res.send(response);
});

module.exports = router;
