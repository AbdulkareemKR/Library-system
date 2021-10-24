const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

// mysql://baa3edb8227a69:1dca83a3@us-cdbr-east-04.cleardb.com/heroku_14bd760e873f76d?reconnect=true
// TAKE THE INFO FROM THE LINE ABOVE
const db = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "baa3edb8227a69",
  password: "1dca83a3",
  database: "heroku_14bd760e873f76d",
});

app.use(cors()); //must be written
app.use(express.json()); //must be written
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert = "INSERT INTO movie_reviews (name, review) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {
    console.log(result);
    console.log("submitted");
  });
});

app.delete("/api/delete/:movieName", (req, res) => {
  const deletedName = req.params.movieName;

  const sqlDelete = "DELETE FROM movie_reviews WHERE name = ?";
  db.query(sqlDelete, deletedName, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const updatedName = req.body.movieName;
  const updatedReview = req.body.movieReview;
  const sqlUpdate = "UPDATE movie_reviews SET review = ? WHERE name = ?";

  db.query(sqlUpdate, [updatedReview, updatedName], (err, result) => {
    if (err) console.log(err);
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("running on port ");
});
