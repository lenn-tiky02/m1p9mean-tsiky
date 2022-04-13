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
  imagePath: String,
  fileName: String,
  restaurantId: mongoose.Schema.Types.ObjectId
});

mongoose.model('Plat', platSchema);
