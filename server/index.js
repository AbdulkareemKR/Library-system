const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser"); //must be written
const session = require("express-session");
const jwt = require("jsonwebtoken");
const { validateToken } = require("./middlewares/AuthMiddleware");

// mysql://bafaf149291fc0:460af9be@us-cdbr-east-04.cleardb.com/heroku_9182eb343de3cad?reconnect=true
// TAKE THE INFO FROM THE LINE ABOVE
const db = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "bafaf149291fc0",
  password: "460af9be",
  database: "heroku_9182eb343de3cad",
});

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "registration",
// });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// app.use(cors());

app.use(express.json()); //must be written
app.use(bodyParser.urlencoded({ extended: true })); //must be written

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM book";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/insert", validateToken, (req, res) => {
  const name = req.body.name;
  const information = req.body.information;
  const username = req.user.username;

  const sqlInsert =
    "INSERT INTO card (username, name, information) VALUES (?,?,?)";
  db.query(sqlInsert, [username, name, information], (err, result) => {
    if (err) {
      res.send({ error: err });
    } else {
      res.send({ message: result });
    }
  });
});

app.delete("/api/delete/:name", validateToken, (req, res) => {
  const deletedName = req.params.name;

  const sqlDelete = "DELETE FROM card WHERE name = ?";
  db.query(sqlDelete, deletedName, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ error: err });
    } else {
      res.send({ message: result });
    }
  });
});

app.put("/api/update", (req, res) => {
  const updatedName = req.body.name;
  const updatedReview = req.body.information;
  const sqlUpdate = "UPDATE card SET information = ? WHERE name = ?";

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
      expires: 60 * 60 * 24,
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
    });
  });
  const sqlSelect = "SELECT * FROM registration WHERE username = ?";
  db.query(sqlSelect, username, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          const id = result[0].id;
          const username = result[0].username;
          const token = jwt.sign({ id, username }, "jwtSecret", {
            expiresIn: 300,
          });

          req.session.user = result;
          res.json({ auth: true, token: token, result: result });
        }
      });
    }
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("we need a token");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "failed to authenticate" });
      } else {
        res.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("your are authenticated");
});

app.post("/login", (req, res) => {
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
          const id = result[0].id;
          const username = result[0].username;
          const token = jwt.sign({ id, username }, "jwtSecret", {
            expiresIn: 300,
          });

          req.session.user = result;
          res.json({ auth: true, token: token, result: result });
        } else {
          res.send({
            auth: false,
            message: "username or password is incorrect",
          });
        }
      });
    } else {
      res.send({ auth: false, message: "User does not exists" });
    }
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
