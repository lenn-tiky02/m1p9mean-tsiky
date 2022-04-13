var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.findAll = function(req, res) {
  Restaurant.find()
     .then(data => {
       res.send(data);
     })
     .catch(err => {
       res.status(500).send({
         message:
           err.message || "Some error occurred while retrieving Restaurants."
       });
     });
 };
 
 module.exports.findByName = function(req, res) {
  const name = req.params.name;
   Restaurant.find({
     nom: name
   })
     .then(data => {
       if (!data)
         res.status(404).send({ message: "Not found Restaurant with id " + id });
       else res.send(data);
     })
     .catch(err => {
       res
         .status(500)
         .send({ message: "Error retrieving Restaurant with id=" + id });
     });
  };
 
  module.exports.findById = function(req, res) {
    const id = req.params.id;
    Restaurant.find(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Restaurant with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Restaurant with id=" + id });
      });
   };
 
  module.exports.update = function(req,res){
 
   if (!req.body) {
     return res.status(400).send({
       message: "Data to update can not be empty!"
     });
   }
 
   const id = req.params.id;
   Restaurant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
     .then(data => {
       if (!data) {
         res.status(404).send({
           message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found!`
         });
       } else res.send({ message: "Restaurant was updated successfully." });
     })
     .catch(err => {
       res.status(500).send({
         message: "Error updating Restaurant with id=" + id
       });
     });
 }
 
 module.exports.delete = function(req,res){
   const id = req.params.id;
   Restaurant.findByIdAndRemove(id)
     .then(data => {
       if (!data) {
         res.status(404).send({
           message: `Cannot delete Restaurant with id=${id}. Maybe Restaurant was not found!`
         });
       } else {
         res.send({
           message: "Restaurant was deleted successfully!"
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Could not delete Restaurant with id=" + id
       });
     });
 }
 
 module.exports.create = function(req, res) {
 
     if(!req.body.email) {
       sendJSONresponse(res, 400, {
         "message": "All fields required"
       });
       return;
     }
 
     // Create a Tutorial
     const RestaurantToSave = new Restaurant({
      nom: req.body.nom,
      location: req.body.location,
      email: req.body.email,
      telephone: req.body.telephone        
     });
 
     // Save Tutorial in the database
     RestaurantToSave
       .save()
       .then(data => {
         res.send(data);
       })
       .catch(err => {
         res.status(500).send({
           message:
             err.message || "Some error occurred while creating the Restaurant."
         });
       });
 };
 