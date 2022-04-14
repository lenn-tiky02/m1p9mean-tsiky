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

//clients
router.get('/clients', auth, ctrlClient.findAll);
router.get('/clients/:id', auth, ctrlClient.findById);
router.get('/clients/email', auth, ctrlClient.findByEmail);
router.post('/clients', ctrlClient.create);
router.put('/clients/:id', auth, ctrlClient.update);
router.delete('/clients/:id', auth, ctrlClient.delete);

//restaurants
router.get('/restaurants', ctrlRestaurant.findAll);
router.get('/restaurants/:id', auth, ctrlRestaurant.findById);
router.get('/restaurants/name/:name', auth, ctrlRestaurant.findByName);
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
