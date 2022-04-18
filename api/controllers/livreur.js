var mongoose = require('mongoose');
var Livreur = mongoose.model('Livreur');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.findAll = function(req, res) {
 Livreur.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Livreurs."
      });
    });
};

module.exports.findByRestaurant = function(req, res) {
  const id = req.params.id;
  console.log(id + 'this is my idddd');
  Livreur.find({
    restaurantId: id
  })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Livreur with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Livreur with id=" + id });
    });
 };

 module.exports.findById = function(req, res) {
   const id = req.params.id;
   Livreur.findById(id)
     .then(data => {
       if (!data)
         res.status(404).send({ message: "Not found Livreur with id " + id });
       else res.send(data);
     })
     .catch(err => {
       res
         .status(500)
         .send({ message: "Error retrieving Livreur with id=" + id });
     });
  };

 module.exports.update = function(req,res){

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Livreur.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Livreur with id=${id}. Maybe Livreur was not found!`
        });
      } else res.send({ message: "Livreur was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Livreur with id=" + id
      });
    });
}

module.exports.delete = function(req,res){
  const id = req.params.id;
  Livreur.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Livreur with id=${id}. Maybe Livreur was not found!`
        });
      } else {
        res.send({
          message: "Livreur was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Livreur with id=" + id
      });
    });
}

module.exports.create = function(req, res) {

    if(!req.body.nom || !req.body.prenom || !req.body.telephone) {
      sendJSONresponse(res, 400, {
        "message": "All fields required"
      });
      return;
    }

    // Create a Tutorial
    const LivreurToSave = new Livreur({
      nom: req.body.nom ,
      prenom: req.body.prenom ,
      telephone: req.body.telephone ,
      zoneId: req.body.zoneId             
    });

    // Save Tutorial in the database
    LivreurToSave
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Livreur."
        });
      });
};
