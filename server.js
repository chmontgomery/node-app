var logger = require('./src/lib/services/logger');
var app = require('./src/app')();
var config = require('./src/lib/services/config');
var port = config.get('PORT');

app.set('port', port);

app.listen(port, function () {
  logger.info('Server listening on port %s', port);
});
