import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Fade } from "react-awesome-reveal";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import styles from "./librarianHomePage.module.css";
import "../../App.css";
import Card from "react-bootstrap/Card";
import { GrSort, GrSearch } from "react-icons/gr";
import FormControl from "react-bootstrap/FormControl";

function LibrarianHomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loginStatus, setLogingStatus] = useState("");
  const [loginButton, setLoginButton] = useState("login");
  let navigate = useNavigate();
  const [cardList, setCardList] = useState([]);
  const [search, setSearch] = useState("");

  Axios.defaults.withCredentials = true; //must be written

  const handleLoginButton = () => {
    setLoginButton("login");
  };
  const handleRegisterButton = () => {
    setLoginButton("register");
  };

  const handleLibrarianButton = () => {
    setLoginButton("librarian");
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/member").then((response) => {
      setCardList(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      console.log("from get", response);
      // if (response.data.loggedIn === true) {
      //   setLogingStatus(response.data.user[0].email);
      // }
    });
  }, []);

  const handleSearch = () => {
    Axios.post("http://localhost:3001/api/memberSearch", {
      name: search,
    }).then((response) => {
      setCardList(response.data);
    });
  };

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      name: name,
      type: "member",
      nationalId: nationalId,
      studentId: studentId,
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
      navigate("/home");
    });
  };

  const deleteMember = (email) => {
    Axios.delete(`http://localhost:3001/api/deleteMember/${email}`).then(
      (response) => {
        const newList = cardList.filter((item) => item.email !== email);
        setCardList(newList);
        console.log(response);
      }
    );
  };

  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: { "x-access-token": localStorage.getItem("token") },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <Row>
        <Container fluid style={{ margin: "auto" }}>
          <Row className={styles.registrationButtons}>
            <Col className={styles.col}>
              <Button
                className={`${styles.createButton} ${
                  loginButton === "login" ? `${styles.createButtonActive}` : ""
                }`}
                onClick={handleLoginButton}
              >
                Add Member
              </Button>
            </Col>
            <Col className={styles.col}>
              <Button
                className={`${styles.createButton} ${
                  loginButton === "register"
                    ? `${styles.createButtonActive}`
                    : ""
                }`}
                onClick={handleRegisterButton}
              >
                Cancel Membership
              </Button>
            </Col>
          </Row>
        </Container>
        <Col xs={5} style={{ margin: "auto" }}>
          {loginButton === "login" ? (
            <Form>
              <h3 className={styles.text}>Adding Member</h3>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>National ID</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter your National ID"
                  onChange={(e) => setNationalId(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Ener your student ID"
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button className="original-button" onClick={register}>
                Add Member
              </Button>
            </Form>
          ) : loginButton === "register" ? (
            <div className={styles.bookCard}>
              <Button onClick={handleSearch} className={styles.searchButton}>
                <GrSearch />
              </Button>

              <Row style={{ display: "inline-block" }}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className={styles.search}
                  aria-label="Search"
                  onChange={(event) => setSearch(event.target.value)}
                />
              </Row>
              <h3 className={styles.text}>Canceling Membership</h3>
              {cardList.map((value, key) => {
                return (
                  <div key={key}>
                    <Fade
                      durtion={1200}
                      cascade
                      damping={0.02}
                      triggerOnce // to present each element on itself while moving down
                      direction="up"
                    >
                      <Card className={`${styles.card}`}>
                        <Card.Header style={{ margin: "auto" }}>
                          <div className={styles.bookName}>{value.name}</div>
                        </Card.Header>
                        <Card.Body style={{ color: "#00901f" }}>
                          {value.email}
                        </Card.Body>
                        {/* <Card.Body>{value.nationalID}</Card.Body> */}
                        <Button
                          variant="danger"
                          className={styles.deleteButton}
                          onClick={() => deleteMember(value.email)}
                        >
                          Delete Member
                        </Button>
                      </Card>
                    </Fade>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}

          <div>{loginStatus}</div>
        </Col>
      </Row>
    </div>
  );
}

export default LibrarianHomePage;
