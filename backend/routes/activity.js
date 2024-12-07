const router = require('express').Router();
const activityController = require('../controllers/activityController');
const feedbackController = require('../controllers/feedbackController');

router.post('/add', activityController.createActivity);

router.get('/', activityController.getAllActivities);

router.post('/feedback/:code', feedbackController.submitFeedback);

router.get('/feedback/:code', feedbackController.getFeedbackByActivityCode);

router.get('/edit', activityController.updateActivity);

router.delete('/:id', activityController.deleteActivity);

module.exports = router;