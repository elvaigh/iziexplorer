const express = require('express');
const calendarController = require('../controllers/calendarController');

const router = express.Router();

router.get('/', calendarController.getEvents);
router.post('/', calendarController.addEvent);
router.put('/:id', calendarController.editEvent);

module.exports = router;