import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Fade } from "react-awesome-reveal";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";

function InformationCard() {
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");
  const [cardList, setCardList] = useState([]);
  const [newName, SetNewName] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetch, setFetch] = useState(false);

  const editMovie = () => {
    setEdit(!edit);
  };

  const submitReview = () => {
    Axios.post(
      "http://localhost:3001/api/insert",
      {
        name: name,
        information: information,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      if (response.data.error) {
        alert("you are not signed in");
      } else {
        setName("");
        setInformation("");
        setCardList([...cardList, { name, information: information }]);
        setFetch(!fetch);
      }
    });
  };

  const deleteReview = (name) => {
    Axios.delete(`http://localhost:3001/api/delete/${name}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setFetch(!fetch);
      }
    });
  };

  const updateReview = (name) => {
    Axios.put("http://localhost:3001/api/update", {
      name: name,
      information: newName,
    });
    SetNewName("");
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setLoading(false);
      setCardList(response.data);
    });
  }, [fetch]);

  return (
    <div>
      <Form>
        <Col xs={5} style={{ margin: "auto" }}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your description"
              onChange={(e) => {
                setInformation(e.target.value);
              }}
              value={information}
            />
          </Form.Group>
          <Button onClick={submitReview}>Submit</Button>
          <br />
        </Col>
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
                          <div> {value.username} </div>
                          Information Card
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            {edit ? (
                              <Form.Control
                                type="text"
                                defaultValue={value.name}
                                onChange={(e) => {
                                  SetNewName(e.target.value);
                                }}
                              />
                            ) : (
                              <div>{value.name}</div>
                            )}
                          </Card.Title>
                          <Card.Text>{value.information}</Card.Text>
                          <Button
                            variant="danger"
                            onClick={() => {
                              deleteReview(value.name);
                            }}
                          >
                            Delete
                          </Button>
                          <div>{newName}</div>
                          <Button
                            variant="primary"
                            onClick={() => {
                              updateReview(value.name);
                            }}
                          >
                            Change
                          </Button>
                          <Button variant="primary" onClick={editMovie}>
                            Edit
                          </Button>
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
      </Form>
    </div>
  );
}

export default InformationCard;
