var logger = require('../utilities/logger');

module.exports = function (req, res, next) {
  // Assets do not out log.

  var t = new Date();
  logger.log('\n\nStarted', t.toISOString(), req.method, req.url, req.ip);

  res.on('finish', function () {
    var duration = ('(' + ((new Date()) - t) + 'ms)');

    switch (res.statusCode) {
    case 500:
      duration = duration.red;
      break;
    case 404:
      duration = duration.yellow;
      break;
    default:
      duration = duration.green;
      break;
    }
  logger.log('Completed', res.statusCode, duration);
  });

  next();
};
