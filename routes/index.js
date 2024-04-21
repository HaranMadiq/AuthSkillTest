const express = require('express');
const passport = require('passport');
const router = express.Router();

// requiring user controller 
const user_Controller = require('../controllers/user_controller');

// routes for home page
router.get('/home', user_Controller.homepage);

// routes for signup page
router.get('/', user_Controller.signupPage);

// routes for login page 
router.get('/login', user_Controller.loginPage);

// routes for reset page
router.get('/reset', user_Controller.resetPage)

// routes for destroy session
router.get('/logout', user_Controller.destroy);

// create new user in database 
router.post('/signup', user_Controller.signup);

// reset password
router.post('/reset', user_Controller.reset);

// create new session for user 

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/user/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect or respond as needed
    res.redirect('/home'); // Redirect to a dashboard or another route
  }
);


// create new session for user 
router.post('/signin', passport.authenticate('local', { failureRedirect: '/login' }), user_Controller.signin);
module.exports = router;