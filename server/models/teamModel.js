const { createTables, pool } = require('../db');

const getAllTeamMembers = async () => {
  const res = await pool.query('SELECT * FROM team_members');
  return res.rows;
};

const createTeamMember = async (name, role) => {
  const res = await pool.query(
    'INSERT INTO team_members (name, role) VALUES ($1, $2) RETURNING *',
    [name, role]
  );
  return res.rows[0];
};

const updateTeamMember = async (id, name, role) => {
  const res = await pool.query(
    'UPDATE team_members SET name = $1, role = $2 WHERE id = $3 RETURNING *',
    [name, role, id]
  );
  return res.rows[0];
};

module.exports = { getAllTeamMembers, createTeamMember, updateTeamMember };