const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");

// mysql://baa3edb8227a69:1dca83a3@us-cdbr-east-04.cleardb.com/heroku_14bd760e873f76d?reconnect=true
// TAKE THE INFO FROM THE LINE ABOVE
const db = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "baa3edb8227a69",
  password: "1dca83a3",
  database: "heroku_14bd760e873f76d",
});

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "registration",
// });

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

app.use(cors());

app.use(cookieParser); //must be written

app.use(express.json()); //must be written
app.use(bodyParser.urlencoded({ extended: true })); //must be written

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

/////////////////////////////////REGISTRATION////////////////////////////////////////////////////////
app.use(
  session({
    key: "userId",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60,
    },
  })
);

const saltRounds = 10;

app.post("/register", (req, res) => {
  console.log("backend registration");
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const sqlInsert =
      "INSERT INTO registration (username, password) VALUES (?,?)";
    db.query(sqlInsert, [username, hash], (err, result) => {
      console.log(result);
      console.log(err);
    });
  });
});

app.post("/login", (req, res) => {
  console.log("login backend");
  const username = req.body.username;
  const password = req.body.password;

  const sqlSelect = "SELECT * FROM registration WHERE username = ?";
  db.query(sqlSelect, username, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          // req.session.user = result;
          console.log(req.session.user);
          res.send(result);
        } else {
          res.send({ message: "username or password is incorrect" });
        }
      });
    } else {
      res.send({ message: "User does not exists" });
    }
  });
});

// app.get("/login", (req, res) => {
//   if (req.session.user) {
//     res.send({ loggedIn: true, user: req.session.user });
//   } else {
//     res.send({ loggedIn: false });
//   }
// });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
