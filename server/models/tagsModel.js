const { createTables, pool } = require('../db');

// Get all tags
exports.getAllTags = async () => {
    const query = 'SELECT * FROM tags ORDER BY name';
    const { rows } = await pool.query(query);
    return rows;
};

// Create a new tag
exports.createTag = async (name) => {
    const query = 'INSERT INTO tags (name) VALUES ($1) RETURNING *';
    const { rows } = await pool.query(query, [name]);
    return rows[0];
};

// Delete a tag
exports.deleteTag = async (id) => {
    // First remove all references in has_tags
    await pool.query('DELETE FROM has_tags WHERE id_tag = $1', [id]);
    // Then delete the tag
    await pool.query('DELETE FROM tags WHERE id = $1', [id]);
};

// Get tags for a specific object
exports.getObjectTags = async (objectId) => {
    const query = `
        SELECT name 
        FROM tags, has_tags 
        WHERE tags.id = id_tag and id_object = $1
        ORDER BY name
    `;
    const { rows } = await pool.query(query, [objectId]);
    return rows;
};

// Add tag to object
exports.addTagToObject = async (tagId, objectId) => {
    const query = 'INSERT INTO has_tags (id_tag, id_object) VALUES ($1, $2) ON CONFLICT DO NOTHING';
    await pool.query(query, [tagId, objectId]);
};

// Remove tag from object
exports.removeTagFromObject = async (tagId, objectId) => {
    const query = 'DELETE FROM has_tags WHERE id_tag = $1 AND id_object = $2';
    await pool.query(query, [tagId, objectId]);
};

exports.findTagByName = async (name) => {
    const query = 'select * from tags where name = $1';
    const { rows } = await pool.query(query, [name]);
    return {
            id: rows[0].id,
            name: rows[0].name  // Including name can be useful for verification
        };
};