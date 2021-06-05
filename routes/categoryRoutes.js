const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const {authenticateUser} = require('../middleware/auth');

router.post('/api/category', authenticateUser, categoryController.createCategory);

router.get('/api/category/:name', authenticateUser, categoryController.fetchSingleCategory);

router.get('/api/category/:name/:subjectId', authenticateUser, categoryController.fetchCategorySubject)

module.exports = router;
