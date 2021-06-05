const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {authenticateUser, isAdmin, isAdminOrStudent} = require('../middleware/auth')
// Import the router controller
const usersController = require('../controllers/usersController');

// Login user route
router.post('/api/auth/login', [
    check('email', "Please enter a valid email").isEmail(),
    check('password', "Please enter A valid password").exists(),

], usersController.loginUser);

// admin routes to register all type of users
router.post('/api/register', authenticateUser, isAdmin, usersController.registerNewUser);

// route to register as a tutor
router.post('/api/register/tutor', usersController.registerNewTutor);

// route to register as a student
router.post('/api/register/student', usersController.registerNewStudent);

// Get logged in user
router.get('/api/auth', authenticateUser, usersController.getLoggedInUser);

// GET route to fetch a single tutor
router.get('/api/tutors', authenticateUser, isAdminOrStudent, usersController.fetchTutors);

router.get('/api/tutor/:userId', authenticateUser, isAdmin, usersController.fetchSingleTutor);

module.exports = router;