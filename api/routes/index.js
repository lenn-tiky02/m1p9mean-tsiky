var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload',
  algorithms: ['sha1', 'RS256', 'HS256']
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlPlat = require('../controllers/plat');
var ctrlClient = require('../controllers/client');
var ctrlRestaurant = require('../controllers/restaurant');
var ctrlSendMail = require('../controllers/sendmail');
var ctrlUser = require('../controllers/user');
var ctrlCmd = require('../controllers/commande');
var ctrlLivreur = require('../controllers/livreur');

//routes
router.get('/', (req, res) => {
  res.render('../../public/index.html')
})

//plats
router.get('/plats', auth, ctrlPlat.findAll);
router.get('/plats/:id', auth, ctrlPlat.findById);
router.get('/plats/restaurant/:id', auth, ctrlPlat.findByRestaurant);
router.post('/plats', auth, ctrlPlat.create);
router.put('/plats/:id', auth, ctrlPlat.update);
router.delete('/plats/:id', auth, ctrlPlat.delete);

//livreurs
router.get('/livreurs', auth, ctrlLivreur.findAll);
router.get('/livreurs/:id', auth, ctrlLivreur.findById);
router.get('/livreurs/restaurant/:id', auth, ctrlLivreur.findByRestaurant);
router.post('/livreurs', auth, ctrlLivreur.create);
router.put('/livreurs/:id', auth, ctrlLivreur.update);
router.delete('/livreurs/:id', auth, ctrlLivreur.delete);

//clients
router.get('/clients', auth, ctrlClient.findAll);
router.get('/clients/:id', auth, ctrlClient.findById);
router.get('/clients/email', auth, ctrlClient.findByEmail);
router.post('/clients', ctrlClient.create);
router.put('/clients/:id', auth, ctrlClient.update);
router.delete('/clients/:id', auth, ctrlClient.delete);

//commandes
router.get('/commandes', auth, ctrlCmd.findAll);
router.get('/commandes/:id', auth, ctrlCmd.findById);
router.get('/commandes/client/:id', auth, ctrlCmd.findByClient);
router.get('/commandes/restaurant/:id', auth, ctrlCmd.findByRestaurant);
router.get('/commandes/restaurant/:id/status/:idstatus', auth, ctrlCmd.findByRestaurantAndStatus);
router.get('/commandes/livreur/:id', auth, ctrlCmd.findByLivreur);
router.get('/commandes/status/:idstatus', auth, ctrlCmd.findByStatus);
router.post('/commandes/restaurantDate', ctrlCmd.findByRestaurantDate);
router.post('/commandes/restaurantDateStatut', ctrlCmd.findByRestaurantDateAndStatus);
router.post('/commandes', ctrlCmd.create);
router.put('/commandes/:id', auth, ctrlCmd.update);
router.delete('/commandes/:id', auth, ctrlCmd.delete);

//restaurants
router.get('/restaurants', ctrlRestaurant.findAll);
router.get('/restaurants/:id', auth, ctrlRestaurant.findById);
router.get('/restaurants/name/:name', auth, ctrlRestaurant.findByName);
router.get('/restaurants/bytext/:text', ctrlRestaurant.findByTextName);
router.post('/restaurants', auth, ctrlRestaurant.create);
router.put('/restaurants/:id', auth, ctrlRestaurant.update);
router.delete('/restaurants/:id', auth, ctrlRestaurant.delete);


// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//users
router.get('/users', auth, ctrlUser.findAll);

// send mail
router.post('/sendMail', ctrlSendMail.sendMail);
module.exports = router;
