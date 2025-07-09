const express = require('express');
const gamesController = require('../controllers/gamesController');

const router = express.Router();

router.get('/', gamesController.getGames);
router.post('/', gamesController.addGame);
router.put('/:id', gamesController.editGame);
router.delete('/:id', gamesController.deleteGame);
module.exports = router;