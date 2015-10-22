var request = require('request');
var config = require('config');
var util = require('util');
var logger = require('../utilities/logger');
var Movement = {};
module.exports = Movement;

Movement.findOne = function (req, res, next) {
  var url = util.format('%s/stats/locations_getmoments/?gameid=%s&eventid=%s', config.get('web_host'), req.params.gameid, req.params.playid);
  var option = {
    url: url,
    timeout: config.get('client_req_timeout'),
    json: true
  };

  request.get(option, function (err, response, body) {
    if (err) {
      // logger.warn('Website down!');
      next(err);
    } else if (typeof body !== 'object') {
      //maybe gameid or playid not exist
      next(new Error(body));
    } else {
      res.json(body);
    }

  });
};
