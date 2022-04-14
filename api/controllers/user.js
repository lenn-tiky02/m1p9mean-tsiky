var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.findAll = function(req, res) {
  User.find()
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving Users."
       });
     });
 };
 