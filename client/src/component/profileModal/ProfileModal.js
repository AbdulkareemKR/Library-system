import React, { useEffect, useState } from "react";
import Axios from "axios";
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
import Card from "react-bootstrap/Card";
import { Fade } from "react-awesome-reveal";

// import React, { useState } from "react";

function ProfileModal(props) {
  const [memberInfo, setMemberInfo] = useState([]);
  const [checkoutTime, setCheckoutTime] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [returned, setReturned] = useState(true);
  const current = new Date();

  const handleMemberInfo = () => {
    props.handleLogIn();
    Axios.get("http://localhost:3001/api/memberInfo", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        console.log("form profile ", response);
        setMemberInfo(response.data);
      }
    });
  };

  // const penaltyAndTime = function (data) {
  //   if (data.returnDate == null) {
  //     setReturned(false);
  //   } else {
  //     const current = new Date();
  //     console.log("hellow");
  //     setCheckoutTime(current - data.checkoutDat);
  //   }
  // };

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
                  onClick={handleMemberInfo}
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
                  <div className={styles.bookCard}>
                    {memberInfo.map((value, key) => {
                      return (
                        <div key={key}>
                          <Fade
                            durtion={1200}
                            cascade
                            damping={0.02}
                            triggerOnce // to present each element on itself while moving down
                            direction="up"
                          >
                            <Card className={styles.card}>
                              <Card.Header>
                                <div>{value.title}</div>
                              </Card.Header>
                              <Card.Body className={styles.cardBody}>
                                {value.subject} <br />
                                Check out Date:{" "}
                                {value.checkoutDate.substring(0, 10)}
                                {value.checkoutDate}
                                {/* {value.returnDate == null
                                  ? setCheckoutTime(current.getTime())
                                  : value.checkoutDate}
                                {checkoutTime} */}
                                {value.returnDate}
                              </Card.Body>
                              {/* <Card.Body>{value.nationalID}</Card.Body> */}
                              {value.returnDate != null ? (
                                <Button variant="success">
                                  The book has beend returned
                                </Button>
                              ) : (
                                <Button
                                  variant="warning"
                                  className={styles.deleteButton}
                                  // onClick={() => deleteMember(value.email)}
                                >
                                  Return Book
                                </Button>
                              )}
                            </Card>
                          </Fade>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
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
                  </div>
                )}
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
