const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

const PORT = 3001;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "react-db",
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

//BEFORE DEPLOYING--------------------
// app.listen(3001, () => {
//   console.log("running on port ");
// });

//AFTER DEPLOYING---------------------
app.listen(process.env.PORT || 5000, () => {
  console.log("running on port ");
});
