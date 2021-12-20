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

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

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

app.delete("/api/deleteMember/:email", (req, res) => {
  const email = req.params.email;

  console.log("i am here", email);
  const sqlSelect = `DELETE FROM person WHERE email = "${email}"`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/api/deleteBook/:ISBN", (req, res) => {
  const isbn = req.params.ISBN;

  const sqlSelect = `DELETE FROM book WHERE ISBN = "${isbn}"`;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/member", (req, res) => {
  const sqlSelect = 'SELECT * FROM person WHERE type = "member"';
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/memberSearch", (req, res) => {
  const name = req.body.name;

  const sqlSelect = `SELECT * FROM person WHERE name LIKE "%${name}%"`;

  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/bookSearch", (req, res) => {
  const search = req.body.search;
  const sort = req.body.sort;
  const subject = req.body.subject;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  console.log("iam in backend", search, sort, subject);
  const sqlSelect = `SELECT * FROM book WHERE ${sort} LIKE "%${search}%"${
    subject != "All" ? ` AND subject = "${subject}"` : ""
  }${
    startDate
      ? ` AND publicationDate BETWEEN "${startDate}" AND "${endDate}"`
      : ""
  }`;
  console.log(sqlSelect);
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

app.post("/api/checkoutBook", validateToken, (req, res) => {
  const name = req.body.name;
  const information = req.body.information;
  const nationalId = req.user.nationalId;

  console.log("this is nationalid ", nationalId);
  // const sqlInsert =
  //   "INSERT INTO card (username, name, information) VALUES (?,?,?)";
  // db.query(sqlInsert, [username, name, information], (err, result) => {
  //   if (err) {
  //     res.send({ error: err });
  //   } else {
  //     res.send({ message: result });
  //   }
  // });
});

app.post("/api/addBook", (req, res) => {
  const {
    isbn,
    title,
    subject,
    barcodeNumber,
    author,
    image,
    rackNumber,
    publicationDate,
    numberOfCopies,
    description,
  } = req.body;

  console.log(
    isbn,
    title,
    subject,
    barcodeNumber,
    author,
    image,
    rackNumber,
    publicationDate,
    numberOfCopies,
    description
  );
  const sqlInsert =
    "INSERT INTO book (ISBN, title, subject, barcodeNumber, author, image, rackNumber, publicationDate,numberOfCopies, description) VALUES (?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      isbn,
      title,
      subject,
      barcodeNumber,
      author,
      image,
      rackNumber,
      publicationDate,
      numberOfCopies,
      description,
    ],
    (err, result) => {
      if (err) {
        res.send({ error: err });
        console.log(err);
      } else {
        res.send({ message: result });
        console.log(result);
      }
    }
  );
});

app.put("/api/editBook", (req, res) => {
  const {
    isbn,
    title,
    subject,
    barcodeNumber,
    author,
    image,
    rackNumber,
    publicationDate,
    numberOfCopies,
    description,
    oldisbn,
  } = req.body;

  console.log(
    isbn,
    title,
    subject,
    barcodeNumber,
    author,
    image,
    rackNumber,
    publicationDate,
    numberOfCopies,
    description,
    oldisbn
  );
  const sqlInsert = `UPDATE book SET ISBN = ${isbn}, title = "${title}", subject = "${subject}", barcodeNumber = ${barcodeNumber}, author = "${author}", image = "${image}", rackNumber = ${rackNumber}, publicationDate = "${publicationDate}", numberOfCopies = ${numberOfCopies}, description = "${description}" WHERE ISBN = ${oldisbn};`;
  db.query(
    sqlInsert,
    [
      isbn,
      title,
      subject,
      barcodeNumber,
      author,
      image,
      rackNumber,
      publicationDate,
      numberOfCopies,
      description,
    ],
    (err, result) => {
      if (err) {
        res.send({ error: err });
        console.log(err);
      } else {
        res.send({ message: result });
        console.log(result);
      }
    }
  );
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
  const name = req.body.name;
  const nationalId = req.body.nationalId;
  const studentId = req.body.studentId;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const sqlInsert =
      "INSERT INTO person (name, nationalID, type, email, password) VALUES (?, ?, ?, ?, ?)";
    db.query(
      sqlInsert,
      [name, nationalId, type, email, hash],
      (err, result) => {
        console.log(result);
      }
    );
  });

  const token = jwt.sign({ name, nationalId }, "jwtSecret", {
    expiresIn: 60 * 60,
  });

  req.session.user = { name, nationalId };
  res.json({ auth: true, token: token, result: { name, nationalId } });
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
        res.userId = decoded.nationalId;
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("your are authenticated");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sqlSelect = "SELECT * FROM person WHERE email = ?";
  db.query(sqlSelect, email, (err, result) => {
    console.log(result);
    if (err) {
      res.send({ err: err });
      console.log(err);
    }
    console.log("Database value: ", result[0].password);
    console.log("passed value: ", password);

    if (result.length > 0) {
      console.log("iam in bcrypt");
      bcrypt.compare(password, result[0].password, (error, response) => {
        console.log("after bcrypt");
        console.log(response);
        if (error) {
          console.log(error);
        } else if (response) {
          const name = result[0].name;
          const nationalId = result[0].nationalID;
          const token = jwt.sign({ name, nationalId }, "jwtSecret", {
            expiresIn: 300,
          });

          req.session.user = result;
          res.json({
            auth: true,
            token: token,
            result: result,
            type: result[0].type,
          });
        } else {
          res.send({
            auth: false,
            message: "email or password is incorrect",
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
