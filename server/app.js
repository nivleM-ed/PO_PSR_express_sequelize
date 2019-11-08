var createError = require('http-errors');
var express = require('express');
// var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let passport = require('passport');
let session = require('express-session');

var indexRouter = require('./routes/index');
var purchase_order = require('./routes/purchase_order');
var psr = require('./routes/psr');
var leave = require('./routes/leave');
var admin = require('./routes/admin');
var winston = require('./logs/loggerDebug');

require('./passport_setup')(passport);
let {run_db} = require('./dbJoin');

var app = express();
// app.use(cors({
//   origin: "http://localhost:8080",
//   credentials: true,
//   exposedHeaders: ['Content-Length', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
// }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
  if ('OPTIONS' == req.method) {
       res.sendStatus(200);
   } else {
       next();
   }
  });

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:"apassword",
  saveUninitialized:false,
  resave:false,
  cookie:{secure:false, httpOnly:true, path: '/'} //maxAge:15 * 1000 * 3600
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/po', purchase_order);
app.use('/psr', psr);
app.use('/leave', leave);
app.use('/admin', admin);
app.use(logger('combined', { stream: winston.stream.write }));
run_db();
//For production
if (process.env.NODE_ENV === 'production') {
  //Static folder of vue.js dist
  app.use(express.static(__dirname + '/public'));

  //Handle SPA (Single Page Application)
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // render the error page
  res.status(err.status || 500);
  // res.render('error'); //can't render since no views engine
});

module.exports = app;
