var mongoose = require( 'mongoose' );

var commandeSchema = new mongoose.Schema({ 
  client: mongoose.Schema.Types.ObjectId,
  prixDeVenteTotalCommande: mongoose.Decimal128,
  prixDeRevienTotalCommande: mongoose.Decimal128,
  beneficeTotalCommande: mongoose.Decimal128,
  listePlats: [mongoose.Schema.Types.ObjectId],
  statut: String,
  dateCommande: Date,
  dateLivraison: Date
});

mongoose.model('Commande', commandeSchema);
