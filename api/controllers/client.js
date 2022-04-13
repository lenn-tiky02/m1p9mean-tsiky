var mongoose = require('mongoose');
var Client = mongoose.model('Client');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.findAll = function(req, res) {
 Client.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Clients."
      });
    });
};

module.exports.findByEmail = function(req, res) {
  const mail = req.body.email;
  Client.find({
    email: mail
  })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Client with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Client with id=" + id });
    });
 };

 module.exports.findById = function(req, res) {
   const id = req.params.id;
   Client.find(id)
     .then(data => {
       if (!data)
         res.status(404).send({ message: "Not found Client with id " + id });
       else res.send(data);
     })
     .catch(err => {
       res
         .status(500)
         .send({ message: "Error retrieving Client with id=" + id });
     });
  };

 module.exports.update = function(req,res){

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Client.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Client with id=${id}. Maybe Client was not found!`
        });
      } else res.send({ message: "Client was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Client with id=" + id
      });
    });
}

module.exports.delete = function(req,res){
  const id = req.params.id;
  Client.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
        });
      } else {
        res.send({
          message: "Client was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Client with id=" + id
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
    const ClientToSave = new Client({       
      adresseLivraison: req.body.adresseLivraison,
      email: req.body.email,
      telephone: req.body.telephone,
      location: req.body.location,
      zoneId: req.body.zoneId          
    });

    // Save Tutorial in the database
    ClientToSave
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Client."
        });
      });
};
