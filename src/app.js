var express = require('express');
var path = require('path');
var glob = require('glob');
var compression = require('compression');
require('./lib/dust-precompile')({
  viewPath: path.join(__dirname, 'views')
});
var errorHandler = require('./lib/error-handler');
var requestLogger = require('./lib/request-logger');
var config = require('./lib/services/config');
var env = config.get('NODE_ENV');
var dust = require('./lib/services/dust');

module.exports = function () {
  var app = express();

  if (env !== 'production') {
    app.use(requestLogger()); // log all requests
  }
  //app.use(bodyParser.json());
  //app.use(bodyParser.urlencoded({
  //  extended: true
  //}));
  //app.use(cookieParser());
  app.use(compression());

  app.get('/', function (req, res) {
    dust.render('index', { message: 'Hello, World!', companyName: 'Dow Jones & Company, Inc.' }, function (err, out) {
      res.send(out);
    });
  });
  app.get('/_health', function (req, res) {
    res.sendStatus(200);
  });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // generic error handler
  app.use(errorHandler);

  return app;
};
