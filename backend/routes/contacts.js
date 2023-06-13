const express = require('express');
const {constructPool, getPool} = require('../database');

//const {pool} = require('../server'); // Assuming the server.js file is one level up in the directory

const router = express.Router();

// Get all contacts
router.get('/', (req, res) => {
    const pool = getPool();
  pool.query('SELECT * FROM contacts', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result.rows);
    }
  });
});

// Add a new contact
router.post('/', (req, res) => {
  const { nom, prenom, courriel } = req.body;
  const query = 'INSERT INTO contacts (nom, prenom, courriel) VALUES ($1, $2, $3)';
  const values = [nom, prenom, courriel];
  const pool = getPool();
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Contact added successfully' });
    }
  });
});

// Delete a contact
router.delete('/:courriel', (req, res) => {
  const courriel = req.params.courriel;
  const query = 'DELETE FROM contacts WHERE courriel = $1';
  const pool = getPool();
  pool.query(query, [courriel], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Contact deleted successfully' });
    }
  });
});

module.exports = router;
