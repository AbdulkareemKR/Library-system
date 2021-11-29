import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Fade } from "react-awesome-reveal";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import "../App.css";
import Spinner from "react-bootstrap/Spinner";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [loginStatus, setLogingStatus] = useState("");

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: usernameLog,
      password: passwordLog,
    }).then((response) => {
      if (response.data.message) {
        console.log(response);
        setLogingStatus(response.data.message);
      } else {
        setLogingStatus(response.data.username);
      }
    });
  };

  return (
    <div>
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
          type="text"
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
          type="text"
          placeholder="password"
          onChange={(e) => setPasswordLog(e.target.value)}
        />
      </Form.Group>
      <Button onClick={login}>login</Button>
      <div>{loginStatus}</div>
    </div>
  );
}

export default Registration;
