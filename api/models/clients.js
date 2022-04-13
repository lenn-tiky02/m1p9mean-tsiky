var mongoose = require( 'mongoose' );

var clientSchema = new mongoose.Schema({ 
  adresseLivraison: String,
  email: String,
  telephone: String,
  location: String,
  zoneId: String
});

mongoose.model('Client', clientSchema);
