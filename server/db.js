const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
});




// All your table creation queries
const queries = [
  `
  CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    answertype VARCHAR(255),
    tags VARCHAR(255),
    answer VARCHAR(255),
    score INT,
    short_intro TEXT,
    intro TEXT,
    hint TEXT,
    ccorrect TEXT,
    cincorrect TEXT,
    image VARCHAR(255),
    video VARCHAR(255),
    activate VARCHAR(255),
    maxtime INT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    icon VARCHAR(255),
    keept BOOLEAN,
    instruct TEXT,
    audio VARCHAR(255)
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS has_tags (
    id_tag INT,
    id_object INT,
    PRIMARY KEY (id_tag, id_object)
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS calendar_events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    description TEXT
  );
  `
];

for (const query of queries) {
  try {
    await pool.query(query);
    // Optionally log: console.log('Table checked/created');
  } catch (err) {
    console.error('Error creating table:', err);
  }
}


module.exports = { pool };
