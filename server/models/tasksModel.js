const pool = require('../db');

const getAllTasks = async () => {
  const res = await pool.query('SELECT * FROM tasks');
  return res.rows;
};

const getTask = async (id) => {
  const res = await pool.query(
    'Select * from tasks WHERE id = $1',
    [id]
  );
  console.log(id);
  return res.rows[0];
};


const createTask = async (name, description, tags, score, responseType, responseOptions, icon_url, hint, ccorrect, cincorrect, maxtime, imageUrl, videoUrl, audioUrl, activationType, instruction, keepAfterCompletion ) => {
  console.log(icon_url);
  const res = await pool.query(
    'INSERT INTO tasks (name, description, tags, score, answertype, answer, icon,hint, ccorrect, cincorrect, maxtime, image, video, audio, activate,instruct,keept ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *',
    [name, description, tags, score, responseType, responseOptions, icon_url, hint, ccorrect, cincorrect, maxtime, imageUrl, videoUrl, audioUrl, activationType, instruction, keepAfterCompletion ]
  );
  return res.rows[0];
};

const updateTask = async (id, name, description, tags, score, responseType, responseOptions, icon_url, hint, ccorrect, cincorrect, maxtime, imageUrl, videoUrl, audioUrl, activationType, instruction, keepAfterCompletion ) => {
  const res = await pool.query(
    'UPDATE tasks SET name = $1, description = $2, tags = $3, score = $4, answertype=$5, answer=$6, icon=$7, hint=$8, ccorrect=$9, cincorrect=$10 , maxtime=$11, image=$12, video=$13, audio=$14, activate=$15,instruct=$16,keept=$17  WHERE id = $18 RETURNING *',
    [name, description, tags, score, responseType, responseOptions, icon_url, hint, ccorrect, cincorrect, maxtime, imageUrl, videoUrl, audioUrl, activationType, instruction, keepAfterCompletion, id]
  );
  return res.rows[0];
};

const deleteTask = async (id) => {
  const res = await pool.query(
    'delete from tasks WHERE id = $1',
    [id]
  );
  console.log(id);
  return id;
};

const getLastTaskId = async () => {
    try {
        // For PostgreSQL (using RETURNING with ORDER BY and LIMIT)
        const query = `
            SELECT id FROM tasks 
            ORDER BY id DESC 
            LIMIT 1
        `;
        const { rows } = await pool.query(query);
        
        if (rows.length === 0) {
            return null;  // No tasks exist in database
        }
        
        return rows[0].id;
    } catch (error) {
        console.error('Error fetching last task ID:', error);
        throw error;  // Re-throw for calling function to handle
    }
};

module.exports = { getAllTasks, getTask, createTask, updateTask, deleteTask, getLastTaskId };