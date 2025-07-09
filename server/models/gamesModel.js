const pool = require('../db');

const getAllGames = async () => {
  const res = await pool.query('SELECT * FROM games');
  return res.rows;
};

const createGame = async (name, description) => {
  const res = await pool.query(
    'INSERT INTO games (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return res.rows[0];
};

const updateGame = async (id, name, description) => {
  const res = await pool.query(
    'UPDATE games SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    [name, description, id]
  );
  return res.rows[0];
};

const deleteGame = async (id) => {
  await pool.query(
    'DELETE from games WHERE id = $1',
    [id]
  );

};


module.exports = { getAllGames, createGame, updateGame, deleteGame };