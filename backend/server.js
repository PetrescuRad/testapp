require('dotenv').config();
const express = require('express');
//const { Pool } = require('pg');
const {constructPool, getPool} = require('./database');
const contactsRouter = require('./routes/contacts');
const tradesRouter = require('./routes/trades');
const cors = require('cors');
const app = express();
constructPool();

// // Create a new PostgreSQL pool
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD
// });

// Test the database connection
const pool = getPool();

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
    done();
  }
});
//console.log(pool);

// Middleware
app.use(cors());
app.use(express.json());

// Mount the contacts router
//app.use('/contacts', contactsRouter);
app.use('/trades', tradesRouter);


// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
