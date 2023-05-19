var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser = require('body-parser');
require('dotenv').config({path: path.join(__dirname, "./.env")});

var cors = require("cors");

var winLog = require("./core/logger/winston_logger");

var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUI = require("swagger-ui-express");


const readingsRouter = require("./routes/readings");
const authRouter = require("./routes/auth");
const operationOperationClaimsRouter = require("./routes/operation_operation_claims");
const operationsRouter = require("./routes/operations");
const motionSensorsRouter = require("./routes/motion_sensors");
const notificationsRouter = require("./routes/notifications");
const userNotificationRouter = require("./routes/user_notifications");
const recordsRouter = require("./routes/record");

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
      title: 'Smart Office Management System API',
      version: '0.1.0', 
    },
    servers: [
      {
        url: `${process.env.LOCALHOST1}:${PORT}`,
        // url: `${process.env.SCHOOL_LOCALHOST}:${PORT}`
      }
    ],
    components: {
      securitySchemes:{
        bearerAuth:{
          type:'http',
          scheme:'bearer',
          bearerFormat:'JWT',
        }
      }
    },
    security:[{
      bearerAuth:[]
    }]
  },
  apis: [`${__dirname}/routes/*.js`], // files containing annotations as above
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


process.on('warning', e => {
  console.warn(e.stack);
});

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
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/public/records", express.static(path.join(__dirname, "public", "records")))


app.use('/notificationsSocket', notifications.Server);


app.use("/readings", readingsRouter);
app.use("/auth", authRouter);
app.use("/operationOperationClaims", operationOperationClaimsRouter);
app.use("/operations", operationsRouter);
app.use("/motions", motionSensorsRouter);
app.use("/notifications", notificationsRouter);
app.use("/user_notifications", userNotificationRouter);
app.use("/records", recordsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = process.env.STATUS === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(PORT, () => {
  console.log(`Working on ${process.env.LOCALHOST1}:${PORT}/api-docs`)
})


module.exports = app;

