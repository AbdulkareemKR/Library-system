import React from "react";
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
import styles from "./homePage.module.css";
import "../../App.css";

function HomePage() {
  return (
    <div>
      <Svgw />
      <Navbar className={styles.navbar} variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
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
            <Button className={`secondary-button ${styles.signIn}`}>
              Sign in
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default HomePage;
