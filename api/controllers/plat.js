var mongoose = require('mongoose');
var Plat = mongoose.model('Plat');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.findAll = function(req, res) {
 Plat.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Plats."
      });
    });
};

module.exports.findById = function(req, res) {
  const id = req.params.id;
  Plat.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Plat with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Plat with id=" + id });
    });
 };

 module.exports.update = function(req,res){

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Plat.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Plat with id=${id}. Maybe Plat was not found!`
        });
      } else res.send({ message: "Plat was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Plat with id=" + id
      });
    });
}

module.exports.delete = function(req,res){
  const id = req.params.id;
  Plat.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Plat with id=${id}. Maybe Plat was not found!`
        });
      } else {
        res.send({
          message: "Plat was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Plat with id=" + id
      });
    });
}

module.exports.create = function(req, res) {

    if(!req.body.nom || !req.body.description || !req.body.prixDeVente || !req.body.prixDeRevient || !req.body.statutDisponibilite) {
      sendJSONresponse(res, 400, {
        "message": "All fields required"
      });
      return;
    }

    // Create a Tutorial
    const platToSave = new Plat({
      nom : req.body.nom,
      description : req.body.description,
      prixDeVente : req.body.prixDeVente,
      prixDeRevient : req.body.prixDeRevient,
      statutDisponibilite : req.body.statutDisponibilite,
      imagePath : req.body.imagePath                    
    });

    // Save Tutorial in the database
    platToSave
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Plat."
        });
      });
};
