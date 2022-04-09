var mongoose = require( 'mongoose' );

var platSchema = new mongoose.Schema({
  nom: {            
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  prixDeVente:{
    type: mongoose.Decimal128,
    required: true
  },
  prixDeRevien:{
    type: mongoose.Decimal128,
    required: true
  },
  statutDisponibilite: {            
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  }
});

mongoose.model('Plat', platSchema);
