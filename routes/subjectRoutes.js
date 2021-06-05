const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const {authenticateUser, isAdminOrTutor} = require('../middleware/auth');


router.post('/api/subject', authenticateUser, subjectController.createSubjects);

// GET request to fecth a single subject by name
router.get('/api/subject/:name', authenticateUser, subjectController.fetchSubject);

// DELETE request to delete a single subject
router.delete('/api/subject/:id', authenticateUser, isAdminOrTutor, subjectController.deleteSingleSubject);

// PUT request to update a single subject
router.put('/api/subject/:id', authenticateUser, subjectController.updateSingleSubject);

module.exports = router;
