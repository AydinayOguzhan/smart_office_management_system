var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser = require('body-parser');
require('dotenv').config();

var cors = require("cors");

var winLog = require("../api/core/logger/winston_logger");

var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUI = require("swagger-ui-express");
 
var parcaKategorilerRouter = require('./routes/parca_kategoriler');
var parcalarRouter = require("./routes/parca");
var cihazlarRouter = require("./routes/cihazlar");
var veriLimitleriRouter = require("./routes/veri_limit");
var olcumlerRouter = require("./routes/olcum");
var veriLimitKategoriRouter = require("./routes/veri_limit_kategori");
var loglarRouter = require("./routes/logs");

var notifications = require("./web_socket/notification_socket");
const { level } = require('winston');


// var CustomTransport = require("./core/logger/winston_logger");

var app = express();
app.use(cors())

let PORT;
process.env.STATUS === "development" 
? (PORT = process.env.DEV_PORT)
: (PORT = process.env.PROD_PORT)

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: 'Sensor API',
      version: '0.1.0',
    },
    servers: [
      {
        url: `${process.env.LOCALHOST1}:${PORT}`,
        url: `${process.env.SCHOOL_LOCALHOST}:${PORT}`
      }
    ]
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//LOG
app.use((req, res, next) => {
  const urlArr = req.url.split("/");
  const userId = urlArr[urlArr.length - 1];
  winLog.info(`url: ${req.originalUrl} , method: ${req.method} , userId: ${userId}`);
  next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/notifications', notifications.Server);
// app.use(notifications.Server);

// app.use('/users', usersRouter);
app.use('/parca_kategoriler', parcaKategorilerRouter);
app.use('/parca', parcalarRouter);
app.use('/cihaz', cihazlarRouter);
app.use('/veri_limit', veriLimitleriRouter);
app.use('/olcum', olcumlerRouter);
app.use('/veri_limit_kategori', veriLimitKategoriRouter);
app.use('/loglar', loglarRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.STATUS === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.listen(PORT, () => {
  console.log(`Working on localhost:${PORT}/api-docs`)
})


module.exports = app;

