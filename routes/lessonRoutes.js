const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.post('/api/lesson', lessonController.createLessons);


module.exports = router;
