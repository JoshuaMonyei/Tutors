const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/api/category', categoryController.createCategory);

router.get('/api/category/:name', categoryController.fetchSingleCategory);

router.get('/api/category/:name/:subjectId', categoryController.fetchCategorySubject)

module.exports = router;
