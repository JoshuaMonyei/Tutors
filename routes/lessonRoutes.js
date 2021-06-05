const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');
const {authenticateUser} = require('../middleware/auth');

router.post('/api/lesson', authenticateUser,  lessonController.createLessons);

router.get('/api/lessons', authenticateUser, lessonController.fetchLessons);

router.get('/api/lessons/:lessonId', authenticateUser, lessonController.fetchSingleLesson);

// PUT request to update a single lesson
router.put('/api/lessons/:lessonId', authenticateUser, lessonController.updateSingleLesson);

// DELETE request to delete a single lesson
router.delete('/api/lessons/:lessonId', authenticateUser, lessonController.deleteSingleLesson);


module.exports = router;
