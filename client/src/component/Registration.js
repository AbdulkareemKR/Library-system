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

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: username,
      password: password,
    }).then((Response) => {
      console.log(Response);
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
    </div>
  );
}

export default Registration;
