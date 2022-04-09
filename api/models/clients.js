var mongoose = require( 'mongoose' );

var clientSchema = new mongoose.Schema({ 
  userId: mongoose.Schema.Types.ObjectId,
  adresseLivraison: String,
  telephone: String,
  location: String,
  zoneId: String
});

mongoose.model('Client', clientSchema);
