const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Setup - Change from memory to a file-based database for persistence
const dbPath = path.resolve(__dirname, 'database.sqlite'); // Path to SQLite file
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Create Posts table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT
    )`, (err) => {
    if (err) {
      console.error("Error creating table:", err);
    } else {
      console.log("Posts table is ready.");
    }
  });
});

// Routes

// Get all posts
app.get('/posts', (req, res) => {
  db.all("SELECT * FROM posts", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving posts' });
    }
    res.json(rows);
  });
});

// Get a specific post by ID
app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving post' });
    }
    if (!row) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(row);
  });
});

// Create a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }
  const query = "INSERT INTO posts (title, content) VALUES (?, ?)";
  db.run(query, [title, content], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error creating post' });
    }
    res.status(201).json({ id: this.lastID, title, content });
  });
});

// Update a post by ID
app.put('/posts/:id', (req, res) => {
  const { title, content } = req.body;
  const id = req.params.id;
  const query = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
  db.run(query, [title, content, id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error updating post' });
    }
    res.json({ id, title, content });
  });
});

// Delete a post by ID
app.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM posts WHERE id = ?", [id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting post' });
    }
    res.json({ message: 'Post deleted' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
