const router = require('express').Router();
const studentController = require('../controllers/studentController');

router.post('/add', studentController.createStudent);

router.get('/', studentController.getAllStudents);

router.get('/:id', studentController.getStudentById);

router.delete('/:id', studentController.deleteStudent);

module.exports = router;