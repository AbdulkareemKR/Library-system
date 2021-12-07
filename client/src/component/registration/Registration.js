import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Fade } from "react-awesome-reveal";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Svgw } from "./wave.svg";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [loginStatus, setLogingStatus] = useState("");
  let navigate = useNavigate();

  Axios.defaults.withCredentials = true; //must be written

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      console.log(response);
      if (response.data.loggedIn === true) {
        setLogingStatus(response.data.user[0].username);
      }
    });
  }, []);

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
      navigate("/info");
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: usernameLog,
      password: passwordLog,
    }).then((response) => {
      if (!response.data.auth) {
        console.log(response);
        setLogingStatus(response.data.message);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setLogingStatus(response.data.message);
        navigate("/info");
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
      <Svgw />
      <Col xs={5} style={{ margin: "auto" }}>
        <h1>Registration</h1>
        <Form.Group className="mb-3">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button onClick={register}>register</Button>
        <h1>Login</h1>
        <Form.Group className="mb-3">
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            onChange={(e) => setUsernameLog(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            onChange={(e) => setPasswordLog(e.target.value)}
          />
        </Form.Group>
        <Button onClick={login}>login</Button>
        <div>
          {/* {loginStatus && (
            <Button onClick={userAuthenticated}>Check Authentication</Button>
          )} */}
          {loginStatus}
        </div>
      </Col>
    </div>
  );
}

export default Registration;
