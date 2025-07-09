const express = require('express');
const teamController = require('../controllers/teamController');

const router = express.Router();

router.get('/', teamController.getTeamMembers);
router.post('/', teamController.addTeamMember);
router.put('/:id', teamController.editTeamMember);

module.exports = router;