var mongoose = require( 'mongoose' );

var restaurantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  }
});

mongoose.model('Restaurant', restaurantSchema);
