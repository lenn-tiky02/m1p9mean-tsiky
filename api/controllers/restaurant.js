var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
