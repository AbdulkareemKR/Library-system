const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "react-db",
});

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sqlInsert = "INSERT INTO movie_reviews (name, review) VALUES (?,?)";
  db.query(sqlInsert, [movieName, movieReview], (err, result) => {});
});

// app.get("/", (req, res) => {
//   const sqlInsert = "INSERT INTO movie_reviews (name, review) VALUES (?, ?);";
//   db.query(sqlInsert, (err, result) => {
//     res.send("hellow world");
//   });
// });

app.listen(3001, () => {
  console.log("running on port ");
});
