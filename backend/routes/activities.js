const router = require('express').Router();
const activityModel = require('../models/activity');
const feedbackModel = require('../models/feedback');

// Add a new activity
router.post('/add', async (req, res) => {
    const { description, start_time, end_time, code, professor_id } = req.body;

    if (!description || !start_time || !end_time || !code || !professor_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const message = await activityModel.createActivity(description, start_time, end_time, code, professor_id);
        res.status(201).json({ message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all activities
router.get('/', async (req, res) => {
    try {
        const activities = await activityModel.getAllActivities();
        res.json({ activities });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit feedback
router.post('/feedback/:code', async (req, res) => {
    const { emoji, student_id } = req.body;
    const code = req.params.code;

    try {
        const activity = await activityModel.getActivityByCode(code);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        const message = await feedbackModel.createFeedback(student_id, activity.id, emoji);
        res.json({ message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get feedback for a specific activity
router.get('/feedback/:code', async (req, res) => {
    const code = req.params.code;

    try {
        const activity = await activityModel.getActivityByCode(code);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        const feedback = await feedbackModel.getFeedbackByActivityId(activity.id);
        res.json({ feedback });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;