const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
var passport = require('passport');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

const app = express()
// ========================
// Link to Database
// ========================
// Updates environment variables
// @see https://zellwk.com/blog/environment-variables/
require('./dotenv')
require('./api/models/db');
require('./api/config/passport');

// [SH] Bring in the routes for the API (delete the default routes)
var routesApi = require('./api/routes/index');

// ========================
// Middlewares
// ========================

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());
app.use('/api', routesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
if (err.name === 'UnauthorizedError') {
  res.status(401);
  res.json({"message" : err.name + ": " + err.message});
}
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});

// ========================
// Listen
// ========================
const port = process.env.PORT || 5000
app.listen(port, function () {
  console.log(`listening on ${port}`)
})

module.exports = app;