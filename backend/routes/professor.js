const router = require('express').Router();
const professorController = require('../controllers/professorController');

router.post('/add', professorController.createProfessor);

router.get('/', professorController.getAllProfessors);

router.get('/:id', professorController.getProfessorById);

router.delete('/:id', professorController.deleteProfessor);

module.exports = router;