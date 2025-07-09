const express = require('express');
const tagsController = require('../controllers/tagsController');

const router = express.Router();

// Tag CRUD operations
router.get('/', tagsController.getAllTags);
router.post('/', tagsController.createTag);
router.delete('/:id', tagsController.deleteTag);

// Object-tag relationships
router.get('/objects/:objectId', tagsController.getObjectTags);
router.post('/object/', tagsController.addTagsToObject);
router.delete('/objects/:objectId/:Name', tagsController.removeTagFromObject);

module.exports = router;