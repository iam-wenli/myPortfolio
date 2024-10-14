const express = require("express");
const path = require("path");
const helmet = require("helmet");
const {Pool} = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const Port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "dist")));

// Postgres setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  SSL: { rejectUnauthorized: false },
});

// Update a book
app.patch("/api/Books/:BookID", async (req,res)=> {
  const {BookID} = req.params;
  const values = [
    req.body.title,
    req.body.copies,
    req.body.price,
    BookID
  ];

  const client = await pool.connect();
    try { 
      const result = await client.query(
        "UPDATE Books SET title=$1, copies=$2, price=$3 WHERE BookID=$4",
        values
      );
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Book not found.' });
      }
      res.json({ message: 'Book updated successfully!', updatedBook: { BookID, ...req.body } });
    }

    catch (err) {
      if(err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while updating the book.' });
      }
    }
    finally {
      client.release();
    }
  });

// Delete a book
app.delete("/api/Books/:BookID", async (req, res) => {
  const {BookID} = req.params;
  const client = await pool.connect();
  try {
    const result = await client.query(
      "DELETE FROM Books WHERE BookID = $1",
      [BookID]
    );
    // Check if a book was deleted
    if (result.rowCount === 0) {
      return res.status(404).json('Book not found');
    }
    res.status(200).json('Book deleted successfully');
  }
  catch (err) {
      console.error('Error deleting book:', err);
      res.status(500).json(`Error deleting book: ${err.message}`);
  } 
  finally { 
    client.release(); 
  }
});

// Add a new book
app.post("/api/Books", async (req, res) => {
  const client = await pool.connect();
  const values = [
    req.body.title,
    req.body.copies,
    req.body.price
  ];
  try {
    const result = await client.query(
      "INSERT INTO Books (title, copies, price) VALUES ($1,$2,$3)",
      values
    );
    if (result.rowCount === 1) {
      return res.status(201).json({ success: "Book added successfully" });
    } else {
      return res.status(400).json({ message: "Book insertion failed" });
    }
  }
  catch (err){
    return res.json({ message: "Something unexpected has occured" + err });
  }
  finally {
    client.release();
  }
});

// Get all books
app.get("/api/Books", async (req, res) => {
  const client = await pool.connect();
  try{
    const result = await client.query(
    "SELECT * FROM Books"
    );
    res.json(result.rows);  // Return book records as JSON
  }
  catch (err){
    res.status(500).json({ error: 'Database query failed' });
  }
  finally {
    client.release();
  }
});

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json('Something went wrong!', err.message );
  });

// Handle root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  console.log('Server is running!');
});
// Handle all other routes (for a single-page application)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start Server
app.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});
