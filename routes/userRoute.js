const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const auth = require('../middleware/auth')
// Import the router controller
const usersController = require('../controllers/usersController');

// Login user route
router.post('/api/auth/login', [
    check('email', "Please enter a valid email").isEmail(),
    check('password', "Please enter A valid password").exists(),

], usersController.loginUser);

router.post('/api/register', usersController.registerNewUser);

// Get logged in user
router.get('/api/auth', auth, usersController.getLoggedInUser);

router.get('/api/tutors', usersController.fetchTutors);

router.get('/api/tutor/:userId', usersController.fetchSingleTutor);

module.exports = router;