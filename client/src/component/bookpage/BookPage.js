import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Fade } from "react-awesome-reveal";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import styles from "./bookPage.module.css";

function BookPage() {
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");
  const [cardList, setCardList] = useState([]);
  const [newName, SetNewName] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setLoading(false);
      setCardList(response.data);
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
          <div>
            {cardList.map((value, key) => {
              return (
                <div key={key}>
                  <Fade
                    durtion={1200}
                    cascade
                    damping={0.02}
                    triggerOnce // to present each element on itself while moving down
                    direction="up"
                  >
                    <Card className="text-center">
                      <Card.Header style={{ margin: "auto" }}>
                        <div>{/* <img src={value.image} alt="" /> */}</div>
                        {/* <div>{value.image}</div> */}
                        Book
                      </Card.Header>
                      <Card.Body>
                        <Card.Title>
                          {edit ? (
                            <Form.Control
                              type="text"
                              defaultValue={value.name}
                            />
                          ) : (
                            <div>{value.name}</div>
                          )}
                        </Card.Title>
                        <Card.Text>{value.information}</Card.Text>
                        <div>{newName}</div>
                      </Card.Body>
                      <div>
                        <br />
                      </div>
                    </Card>
                  </Fade>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookPage;
