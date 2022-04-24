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
 
 
 module.exports.delete = function(req,res){
  const id = req.params.id;
  console.log('DELETE USER');
  User.find({
    'roles': {$elemMatch: {roleid: id}}}
    ).deleteMany()
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
}