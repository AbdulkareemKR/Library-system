import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Fade } from "react-awesome-reveal";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { ReactComponent as Svgw } from "../SVGs/wave.svg";
import styles from "./header.module.css";
import "../../App.css";
import RegistrationModal from "../registrationModal/RegistrationModal";

function Header() {
  const [showModal, setModal] = useState(false);
  const [logIn, setLogIn] = useState(true);
  const [page, setPage] = useState("home");

  const fireModal = () => {
    console.log("yes");
    setModal(true);
  };

  const handleClose = () => {
    setModal(false);
  };
  const handleLogIn = () => {
    setLogIn(true);
  };
  const handleLogOut = () => {
    setLogIn(false);
  };

  return (
    <div>
      <Svgw />
      <Navbar className={styles.navbar} variant="dark">
        <Container>
          <Navbar.Brand href="#home">KFUPM LIBRARY</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Books</Nav.Link>
            <Nav.Link href="#pricing">About Us</Nav.Link>
            <Form className="d-flex">
              <FormControl
                size="sm"
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button className="secondary-button">Search</Button>
            </Form>
            <Button
              className={`secondary-button ${styles.signIn}`}
              onClick={fireModal}
            >
              Sign in
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <RegistrationModal
        showModal={showModal}
        logIn={logIn}
        handleClose={handleClose}
        handleLogIn={handleLogIn}
        handleLogOut={handleLogOut}
      />
    </div>
  );
}

export default Header;
