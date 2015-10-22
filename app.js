require('colors');
var express = require('express');
var path = require('path');
var config = require('config');
var logger = require('./utilities/logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var requestLogger = require('./middlewares/request-logger');
var routes = require('./routes/api-router-v1');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

app.listen(config.get('app.port'), function () {
  logger.log('NodeClub listening on port', config.get('app.port'));
  logger.log('You can debug your app with http://' + config.get('app.hostname') + ':' + config.get('app.port'));
  logger.log('');
});


module.exports = app;
