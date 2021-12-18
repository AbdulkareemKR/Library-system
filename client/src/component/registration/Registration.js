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
import styles from "./registration.module.css";
import KFUPM_Tower from "../images/KFUPM_Tower.png";
import "../../App.css";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loginStatus, setLogingStatus] = useState("");
  const [loginButton, setLoginButton] = useState("login");
  let navigate = useNavigate();

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
    Axios.get("http://localhost:3001/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setLogingStatus(response.data.user[0].email);
      }
    });
  }, []);

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      name: name,
      nationalId: nationalId,
      studentId: studentId,
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
      navigate("/home");
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        console.log(response);
        setLogingStatus(response.data.message);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setLogingStatus(response.data.message);
        navigate("/home");
      }
    });
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
            <div>
              <Button
                className={`${styles.librarian} ${
                  loginButton === "librarian"
                    ? `${styles.librarianAcitive}`
                    : ""
                }`}
                onClick={handleLibrarianButton}
              >
                Librarian
              </Button>
            </div>
            <Col className={styles.col}>
              <Button
                className={`${styles.createButton} ${
                  loginButton === "register"
                    ? `${styles.createButtonActive}`
                    : ""
                }`}
                onClick={handleRegisterButton}
              >
                Login
              </Button>
            </Col>
            <Col className={styles.col}>
              <Button
                className={`${styles.createButton} ${
                  loginButton === "login" ? `${styles.createButtonActive}` : ""
                }`}
                onClick={handleLoginButton}
              >
                Registration
              </Button>
            </Col>
          </Row>
        </Container>
        <Col xs={5} style={{ margin: "auto" }}>
          {loginButton === "login" ? (
            <Form>
              <h3 className={styles.text}>Registration</h3>
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
              <Button
                type="submit"
                className="original-button"
                onSubmit={register}
              >
                Register
              </Button>
            </Form>
          ) : loginButton === "register" ? (
            <Form>
              <h3 className={styles.text}>Login</h3>
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
                <Form.Label>password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                type="submit"
                className="original-button"
                onSubmit={login}
              >
                Login
              </Button>
            </Form>
          ) : (
            <Form>
              <h3 className={`${styles.librarianText}`}>Login</h3>
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
              <Button
                type="submit"
                className={`${styles.librarianButton}`}
                onSubmit={login}
              >
                Login
              </Button>
            </Form>
          )}

          <div>{loginStatus}</div>
        </Col>
      </Row>
    </div>
  );
}

export default Registration;
