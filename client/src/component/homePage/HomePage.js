import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Fade } from "react-awesome-reveal";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { ReactComponent as Svgw } from "../SVGs/wave.svg";

function HomePage() {
  return (
    <div>
      <Svgw>
        <Navbar bg="light" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </Svgw>
    </div>
  );
}

export default HomePage;
