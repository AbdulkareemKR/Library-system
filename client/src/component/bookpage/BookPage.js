import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Fade } from "react-awesome-reveal";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import styles from "./bookPage.module.css";
import BookInfoPage from "../bookInfoPage/BookInfoPage";

function BookPage() {
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");
  const [cardList, setCardList] = useState([]);
  const [newName, setNewName] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetch, setFetch] = useState(false);
  const [image, setImage] = useState("");
  // let objImg;
  // const mimeType = "image/png";

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setLoading(false);
      setCardList(response.data);
      // objImg = new Buffer.from(response.data[0].image).toString("base64");
      // console.log(objImg);
      // console.log(response.data[0].image);
      // console.log(response.data.image);
      // setImage(objectURL);
    });
  }, [fetch]);
  return (
    <div>
      <div className="wrapper">
        {loading ? (
          <Spinner
            animation="grow"
            className="spinner1"
            // style={{ color: "red" }}
          />
        ) : (
          <div className={styles.bookCard}>
            <Container fluid>
              <Row>
                <Col>
                  {cardList.slice(0, cardList.length / 2).map((value, key) => {
                    return (
                      <div key={key}>
                        <Fade
                          durtion={1200}
                          cascade
                          damping={0.02}
                          triggerOnce // to present each element on itself while moving down
                          direction="up"
                        >
                          <Card
                            onClick={<BookInfoPage />}
                            className={`${styles.card}`}
                          >
                            <Card.Header style={{ margin: "auto" }}>
                              <div>
                                {/* <img src={`data:image/png;base64,${objImg}`} /> */}
                              </div>
                              {/* <div>{value.image}</div> */}
                              Book
                            </Card.Header>
                            <Card.Body>
                              <img
                                src={value.image}
                                className={styles.bookImage}
                              />
                              <div className={styles.bookName}>
                                {value.name}
                              </div>
                            </Card.Body>
                            <div>
                              <br />
                            </div>
                          </Card>
                        </Fade>
                      </div>
                    );
                  })}
                </Col>
                <Col>
                  {cardList
                    .slice(cardList.length / 2, cardList.length - 1)
                    .map((value, key) => {
                      return (
                        <div key={key}>
                          <Fade
                            durtion={1200}
                            cascade
                            damping={0.02}
                            triggerOnce // to present each element on itself while moving down
                            direction="up"
                          >
                            <Card className={`${styles.card}`}>
                              <Card.Header style={{ margin: "auto" }}>
                                <div>
                                  {/* <img src={`data:image/png;base64,${objImg}`} /> */}
                                </div>
                                {/* <div>{value.image}</div> */}
                                Book
                              </Card.Header>
                              <Card.Body>
                                <img
                                  src={value.image}
                                  className={styles.bookImage}
                                />
                                <div className={styles.bookName}>
                                  {value.name}
                                </div>
                              </Card.Body>
                              <div>
                                <br />
                              </div>
                            </Card>
                          </Fade>
                        </div>
                      );
                    })}
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookPage;
