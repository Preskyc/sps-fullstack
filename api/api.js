const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Přidejte middleware pro JSON tělo
router.use(express.json());

console.log('API router loaded');

// Movies CRUD
router.get('/movies', (req, res) => {
  // List (GET all)
  db.all('SELECT * FROM movies', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/movies/:id', (req, res) => {
  // Read (GET one)
  db.get('SELECT * FROM movies WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

router.post('/movies', (req, res) => {
  // Create (POST)
  console.log('POST /movies', req.body);
  const { title, year } = req.body;
  if (!title || !year) return res.status(400).json({ error: 'Title and year are required' });
  db.run('INSERT INTO movies (title, year) VALUES (?, ?)', [title, year], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, year });
  });
});

router.put('/movies/:id', (req, res) => {
  // Update (PUT)
  const { title, year } = req.body;
  db.run('UPDATE movies SET title = ?, year = ? WHERE id = ?', [title, year, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

router.delete('/movies/:id', (req, res) => {
  // Delete (DELETE)
  db.run('DELETE FROM movies WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// Ratings CRUD
router.get('/ratings', (req, res) => {
  db.all('SELECT * FROM ratings', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.get('/ratings/:id', (req, res) => {
  db.get('SELECT * FROM ratings WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

router.post('/ratings', (req, res) => {
  const { username, rating } = req.body;
  if (!username || !rating) return res.status(400).json({ error: 'Username and rating are required' });
  db.run('INSERT INTO ratings (username, rating) VALUES (?, ?)', [username, rating], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, username, rating });
  });
});

router.put('/ratings/:id', (req, res) => {
  const { username, rating } = req.body;
  db.run('UPDATE ratings SET username = ?, rating = ? WHERE id = ?', [username, rating, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

router.delete('/ratings/:id', (req, res) => {
  db.run('DELETE FROM ratings WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;