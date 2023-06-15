const express = require('express');
const { getPool } = require('../database');

const router = express.Router();

// Get all trades
router.get('/', (req, res) => {
  const pool = getPool();
  pool.query('SELECT * FROM trades ORDER BY "Date" ASC', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result.rows);
    }
  });
});

// Create a new trade
router.post('/', (req, res) => {
  const { Date, Time, CADtoUSD, OnlinePrice, BuyPrice, AmtPaid, WeeklyAmt, BTC } = req.body;
  const query = 'INSERT INTO trades ("Date", "Time", "CADtoUSD", "OnlinePrice", "BuyPrice", "AmtPaid", "WeeklyAmt", "BTC") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  const values = [Date, Time, CADtoUSD, OnlinePrice, BuyPrice, AmtPaid, WeeklyAmt, BTC];
  const pool = getPool();
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Trade added successfully' });
    }
  });
});

// Delete a trade
router.delete('/:date', (req, res) => {
  const date = req.params.date;
  const query = 'DELETE FROM trades WHERE "Date" = $1';
  const pool = getPool();
  pool.query(query, [date], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Trade deleted successfully' });
    }
  });
});

module.exports = router;
