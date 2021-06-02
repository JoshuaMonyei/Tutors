const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.post('/api/subject', subjectController.createSubjects);

router.get('/api/subject/:name', subjectController.fetchSubject);

// DELETE request to delete a single subject
router.delete('/api/subject/:id', subjectController.deleteSingleSubject);

// PUT request to update a single intern
router.put('/api/subject/:id', subjectController.updateSingleSubject);

module.exports = router;
