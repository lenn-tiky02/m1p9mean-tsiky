var mongoose = require( 'mongoose' );

var clientSchema = new mongoose.Schema({ 
  nom: String,
  prenom: String,
  telephone: String,
  zoneId: String
});

mongoose.model('Livreur', clientSchema);