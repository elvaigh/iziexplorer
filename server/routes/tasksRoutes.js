const express = require('express');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

router.get('/', tasksController.getTasks);
router.get('/:id', tasksController.getTask);
router.post('/', tasksController.addTask);
router.put('/:id', tasksController.editTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;