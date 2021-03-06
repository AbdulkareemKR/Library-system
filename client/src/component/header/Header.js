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
import { ReactComponent as Svgw } from "../SVGs/wave (2).svg";
import styles from "./header.module.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../profileModal/ProfileModal";
import { FaUser } from "react-icons/fa";

function Header() {
  const [showModal, setModal] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [page, setPage] = useState("home");
  let navigate = useNavigate();

  const fireModal = () => {
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
        <Button
          onClick={fireModal}
          className={`secondary-button ${styles.profile}`}
        >
          <FaUser />
        </Button>
        <Container>
          <Navbar.Brand href="/home">KFUPM LIBRARY</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/book">Books</Nav.Link>
            <Nav.Link href="/aboutUs">About Us</Nav.Link>
            <Form className="d-flex">
              <FormControl
                size="sm"
                type="search"
                placeholder="Quick Search"
                className="me-2"
                aria-label="Search"
              />
              <Button className="secondary-button">Search</Button>
            </Form>
            <Button
              className={`secondary-button ${styles.signIn}`}
              onClick={() => navigate("/")}
            >
              Sign in
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <ProfileModal
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
