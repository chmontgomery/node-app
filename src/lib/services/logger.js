var bunyan = require('bunyan');
var bformat = require('bunyan-format');
var config = require('./config');

var loggerConfig = {
  name: 'my app',
  level: config.get('LOGGER_LEVEL')
};

if (!config.get('NODE_ENV')) {
  loggerConfig.stream = bformat({outputMode: 'short'});
}

module.exports = bunyan.createLogger(loggerConfig);
