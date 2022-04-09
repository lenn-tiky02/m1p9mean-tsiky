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

//routes
router.get('/', (req, res) => {
  res.render('../../public/index.html')
})

//plats
router.get('/plats', auth, ctrlPlat.findAll);
router.get('/plats/:id', auth, ctrlPlat.findById);
router.post('/plats', auth, ctrlPlat.create);
router.put('/plats/:id', auth, ctrlPlat.update);
router.delete('/plats/:id', auth, ctrlPlat.delete);

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
