import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Row, Form } from "react-bootstrap";
import styles from "./profileModal.module.css";
import { FaIdCard } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiTag } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { AiFillUnlock } from "react-icons/ai";
import Container from "react-bootstrap/Container";

// import React, { useState } from "react";

function ProfileModal(props) {
  return (
    <div>
      <Modal
        show={props.showModal}
        onHide={props.handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className={styles.containter}>
          <Modal.Header className={styles.title}>
            <Modal.Title
              className={styles.title}
              id="contained-modal-title-vcenter"
            >
              <BsFillPeopleFill className={styles.icons} />{" "}
              {props.logIn ? "My Books" : "Account Informaion"}
            </Modal.Title>
          </Modal.Header>
          <Container fluid style={{ margin: "auto" }}>
            <Row className={styles.registrationButtons}>
              <Col>
                <Button
                  className={`${styles.createButton} ${
                    props.logIn ? "" : `${styles.createButtonActive}`
                  }`}
                  onClick={props.handleLogOut}
                >
                  Account Informaion
                </Button>
              </Col>
              <Col>
                <Button
                  className={`${styles.createButton} ${
                    props.logIn ? `${styles.createButtonActive}` : ""
                  }`}
                  onClick={props.handleLogIn}
                >
                  My Books
                </Button>
              </Col>
            </Row>
          </Container>
          <Form className={styles.formStyle}>
            <Container fluid style={{ margin: "auto" }}>
              <Modal.Body className="show-grid">
                {props.logIn ? (
                  ""
                ) : (
                  <Form.Group as={Row} className={styles.group}>
                    <Form.Label className={styles.label} column sm="4">
                      <FaIdCard className={styles.icons} /> Username
                    </Form.Label>
                    <Col>
                      <Form.Control
                        required
                        className={styles.input}
                        type="text"
                        placeholder="Username"
                        disabled
                      />
                    </Col>
                  </Form.Group>
                )}
                <Form.Group as={Row} className={styles.group}>
                  <Form.Label className={styles.label} column sm="4">
                    <MdEmail className={styles.icons} /> Email
                  </Form.Label>
                  <Col>
                    <Form.Control
                      required
                      className={styles.input}
                      type="email"
                      placeholder="Email"
                      disabled
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className={styles.group}>
                  <Form.Label className={styles.label} column sm="4">
                    <AiFillUnlock className={styles.icons} /> Password
                  </Form.Label>
                  <Col>
                    <Form.Control
                      required
                      className={styles.input}
                      type="password"
                      placeholder="************"
                      disabled
                    />
                  </Col>
                </Form.Group>

                {props.logIn ? "" : <div></div>}
              </Modal.Body>
              <Modal.Footer className={styles.footer}>
                {props.logIn ? (
                  <Button
                    className={`${styles.createButton} ${styles.submit}`}
                    type="submit"
                  >
                    Edit Reservations
                  </Button>
                ) : (
                  <Button
                    className={`${styles.createButton} ${styles.submit}`}
                    type="submit"
                  >
                    Edit Information
                  </Button>
                )}
              </Modal.Footer>
            </Container>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default ProfileModal;
