var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser = require('body-parser');

var swaggerJsDoc = require("swagger-jsdoc");
var swaggerUI = require("swagger-ui-express");

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var parcaKategorilerRouter = require('./routes/parca_kategoriler');
var parcalarRouter = require("./routes/parca");
var cihazlarRouter = require("./routes/cihazlar");


var app = express();

const swaggerOptions = {
  definition: {
    openapi:"3.0.0",
    info: {
      title: 'Sensor API',
      version: '0.1.0',
    },
    servers:[
      {
        url:"http://localhost:3000"
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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/parca_kategoriler', parcaKategorilerRouter);
app.use('/parca', parcalarRouter);
app.use('/cihaz', cihazlarRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3000,()=>{
  console.log("Working on localhost:3000/api-docs")
})


module.exports = app;

