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
  prixDeVente: mongoose.Types.Decimal128,  
  prixDeRevient: mongoose.Types.Decimal128,    
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
