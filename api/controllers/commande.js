var mongoose = require('mongoose');
var Commande = mongoose.model('Commande');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.findAll = function(req, res) {
 Commande.find()
    .populate('idClient')
    .populate('idRestaurant')
    .populate('listePlats')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Commandes."
      });
    });
};

module.exports.findByRestaurant = function(req, res) {
  const id = req.params.id;
  console.log(id + 'this is my idddd');
  Commande.find({
    restaurantId: id
  })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Commande with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Commande with id=" + id });
    });
 };

 module.exports.findById = function(req, res) {
   const id = req.params.id;
   Commande.findById(id)   
    .populate('idClient')   
    .populate('idRestaurant')
    .populate('listePlats')
     .then(data => {
       if (!data)
         res.status(404).send({ message: "Not found Commande with id " + id });
       else res.send(data);
     })
     .catch(err => {
       res
         .status(500)
         .send({ message: "Error retrieving Commande with id=" + id });
     });
  };

 module.exports.update = function(req,res){

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Commande.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Commande with id=${id}. Maybe Commande was not found!`
        });
      } else res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Commande with id=" + id
      });
    });
}

module.exports.delete = function(req,res){
  const id = req.params.id;
  Commande.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Commande with id=${id}. Maybe Commande was not found!`
        });
      } else {
        res.send({
          message: "Commande was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Commande with id=" + id
      });
    });
}

module.exports.create = function(req, res) {

    if(!req.body.idClient || !req.body.listePlats || !req.body.idRestaurant || !req.body.statut) {
      sendJSONresponse(res, 400, {
        "message": "All fields required"
      });
      return;
    }

    // Create a Tutorial
    const CommandeToSave = new Commande({     
      idClient:         req.body.idClient,
      listePlats:    req.body.listePlats,
      idRestaurant:    req.body.idRestaurant,
      statut:        req.body.statut,
      dateCommande:  req.body.dateCommande,
      dateLivraison: req.body.dateLivraison                  
    });

    // Save Tutorial in the database
    CommandeToSave
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Commande."
        });
      });
};
