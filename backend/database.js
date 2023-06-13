const { Pool } = require('pg');

let pool = {};
const constructPool = () => {
    // Create a new PostgreSQL pool
    pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
} 

const getPool = () => {
    return pool
} 

module.exports = { pool, constructPool, getPool }