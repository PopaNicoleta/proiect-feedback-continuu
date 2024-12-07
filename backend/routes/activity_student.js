const router = require('express').Router();
const activityStudentController = require('../controllers/activityStudentController');

router.post('/add', activityStudentController.createActivityStudent);

router.get('/', activityStudentController.getAllActivityStudents);

router.get('/:id', activityStudentController.getActivityStudentById);

router.delete('/:id', activityStudentController.deleteActivityStudent);

module.exports = router;