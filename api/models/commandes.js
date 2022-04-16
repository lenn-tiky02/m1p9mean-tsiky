var mongoose = require( 'mongoose' );

var commandeSchema = new mongoose.Schema({ 
  idClient: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
  listePlats: [{type: mongoose.Schema.Types.ObjectId, ref: 'Plat'}],
  idRestaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
  statut: String,
  dateCommande: Date,
  dateLivraison: Date,
  totalPrixDeVente: Number,
  totalPrixDeRevient: Number,
  totalPrixBenefice: Number
});

mongoose.model('Commande', commandeSchema);
/*
  prixDeVenteTotalCommande: mongoose.Decimal128,
  prixDeRevienTotalCommande: mongoose.Decimal128,
  beneficeTotalCommande: mongoose.Decimal128,
 */