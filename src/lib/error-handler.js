var config = require('./services/config');
var logger = require('./services/logger');
var env = config.get('NODE_ENV');
var dust = require('./services/dust');
var theme = 'mw-styles';

// NOTE: need to leave "next" in param list, otherwise this won't get called
module.exports = function (err, req, res, next) { // err handler MUST have 4 args
  logger.error(err);

  var model = {
    theme: theme,
    status: err.status || 500,
    message: err.message || 'Internal Server Error'
  };

  if (env !== 'production') {
    // will print stacktrace
    model.error = err;
  } else {
    // no stacktraces leaked to user
    model.error = {
      status: err.status,
      message: err.message
    };
  }

  res.status(model.status);
  dust.render('error', model, function(err, out) {
    if (err) logger.error(err);
    console.log(out)
    res.send(out);
  });
};
