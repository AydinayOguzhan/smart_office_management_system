var express = require('express');
var router = express.Router();


/**
  * @swagger
  * tags:
  *   name: Users
  *   description: Users page
  */

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Returns users page
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Users page
 */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.send({
    id:1,
    name:"Users Page"
  })
});

module.exports = router;
