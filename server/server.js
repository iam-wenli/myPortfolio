const express = require("express");
const path = require("path");
const helmet = require("helmet");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
const Port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "dist")));

// MySQL setup
const db = mysql.createConnection({
  host: process.env.SQLHOST,
  user: process.env.USER_HERE,
  password: process.env.MYSQL_PW,
  database: process.env.DATABASE,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log("MySQL connected ...");
});

// Update a book
app.patch("/api/Books/:BookID",(req,res)=> {
  const {BookID} = req.params;
  const sql = "UPDATE booklist SET title=?, copies=?, price=? WHERE BookID=?";
    const values = [
      req.body.title,
      req.body.copies,
      req.body.price,
      BookID
    ];
    
  db.query(sql, values, (err,results) => {
    if(err) {
      return res.status(500).json({ error: 'An error occurred while updating the book.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    res.json({ message: 'Book updated successfully!', updatedBook: { BookID, ...req.body } });
  });
});

// // Get a specific book
// app.get("/api/Books/:BookID", (req,res)=> {
//   const {BookID} = req.params;
//   console.log("Fetching book with ID:", BookID);

//   const sql = "SELECT * FROM booklist WHERE BookID = ?";
//   db.query(sql, [BookID], (err, results) => {
//     if(err) {
//       console.error("Error querying book:", err);
//       res.status(500).json({error: 'Book query failed'});
//       return;
//     }
//     if (results.length === 0) {
//       res.status(404).json({ error: 'Book not found' });
//       return;
//     }
//     res.json(results[0]); // Send the first book in the array
//   });
// });

// Delete a book
app.delete("/api/Books/:BookID", (req, res) => {
  const {BookID} = req.params;
  const query = 'DELETE FROM booklist WHERE BookID = ?';
  db.query(query, [BookID], (err, result) => {
    if (err) {
      console.error('Error deleting book:', err);
      res.status(500).send(`Error deleting book: ${err.message}`);
      return;
    }
    // Check if a book was deleted
    if (result.affectedRows === 0) {
      return res.status(404).send('Book not found');
    }
    res.status(200).send('Book deleted successfully');
  });
});

// Add a new book
app.post("/api/Books", (req, res) => {
  const sql =
    "INSERT INTO booklist (title, copies, price) VALUES (?,?,?)";
  const values = [
    req.body.title,
    req.body.copies,
    req.body.price
  ];
  db.query(sql, values, (err, result) => {
    if (err)
      return res.json({ message: "Something unexpected has occured" + err });
    return res.json({ success: "Book added successfully"});
  });
});

// Get all books
app.get("/api/Books", (req, res) => {
  console.log('Fetching books...');
  const sql = "SELECT * FROM booklist";
  db.query(sql, (err, results) => {
    if (err) {
        console.error('MySQL error:', err);
        res.status(500).json({ error: 'Database query failed' });
        return;
      }      
      res.json(results);  // Return book records as JSON
    });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    // console.error(err.stack);
    // res.status(500).send('Something went wrong!');
    console.error("Internal Server Error:", err);
    res.status(500).json({ message: "Something went wrong!" });
  });

// Handle root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  res.send('Server is running!');
});
// Handle all other routes (for a single-page application)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Start Server
app.listen(Port, () => {
  console.log(`Listening on port ${Port}`);
});
