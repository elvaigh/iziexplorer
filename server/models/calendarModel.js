const { createTables, pool } = require('../db');

const getAllEvents = async () => {
  const res = await pool.query('SELECT * FROM calendar_events');
  return res.rows;
};

const createEvent = async (title, date, description) => {
  const res = await pool.query(
    'INSERT INTO calendar_events (title, date, description) VALUES ($1, $2, $3) RETURNING *',
    [title, date, description]
  );
  return res.rows[0];
};

const updateEvent = async (id, title, date, description) => {
  const res = await pool.query(
    'UPDATE calendar_events SET title = $1, date = $2, description = $3 WHERE id = $4 RETURNING *',
    [title, date, description, id]
  );
  return res.rows[0];
};

module.exports = { getAllEvents, createEvent, updateEvent };