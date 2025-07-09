const tagsModel = require('../models/tagsModel');

// Get all tags
const getAllTags = async (req, res, next) => {
    try {
        console.log("getting all tags");
        const tags = await tagsModel.getAllTags();
        res.json(tags);
    } catch (err) {
       next(err);
    }
};

// Create a new tag
const createTag = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Tag name is required' });
        }
        
        const newTag = await tagsModel.createTag(name);
        res.status(201).json(newTag);
    } catch (err) {
        next(err);
    }
};

// Delete a tag
const deleteTag = async (req, res, next) => {
    try {
        const { id } = req.params;
        await tagsModel.deleteTag(id);
        res.status(204).end();
    } catch (err) {
       next(err);
    }
};

// Get tags for a specific object
const getObjectTags = async (req, res, next) => {
    try {
        const { objectId } = req.params;
        const tags = await tagsModel.getObjectTags(objectId);
        res.json(tags);
    } catch (err) {
        next(err);
    }
};

// Add multiple tags to object
const addTagsToObject = async (req, res, next) => {
    try {
        const { objectId, tags } = req.body;

        // Validate input
        if (!objectId || !tags || !Array.isArray(tags)) {
            return res.status(400).json({ 
                error: 'Invalid input: objectId and tags array are required' 
            });
        }

        // Process each tag (create if doesn't exist and add to object)
        const results = await Promise.all(
            tags.map(async (tagName) => {
                try {
                    // Check if tag exists
                    let tag = await tagsModel.findTagByName(tagName);
  
                    // Add tag to object (handles duplicate prevention in model)
                    await tagsModel.addTagToObject(tag.id, objectId);
                    return { tag: tag.name, status: 'success' };
                } catch (error) {
                    return { tag: tagName, status: 'failed', error: error.message };
                }
            })
        );

        // Check if any operations failed
        const failedOperations = results.filter(r => r.status === 'failed');
        
        if (failedOperations.length > 0) {
            return res.status(207).json({ // 207 Multi-Status
                message: 'Some tag operations failed',
                results: results,
                successCount: results.length - failedOperations.length,
                failureCount: failedOperations.length
            });
        }

        res.status(201).json({
            message: `Successfully added ${results.length} tags to object`,
            results: results
        });
    } catch (err) {
        next(err);
    }
};

// Remove tag from object
const removeTagFromObject = async (req, res, next) => {
    try {
        const { objectId, tagId } = req.params;
        await tagsModel.removeTagFromObject(tagId, objectId);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
};


module.exports = { getAllTags, createTag, deleteTag, getObjectTags, addTagsToObject, removeTagFromObject };