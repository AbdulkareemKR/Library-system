import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Fade } from "react-awesome-reveal";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import "../App.css";
import Spinner from "react-bootstrap/Spinner";

function InformationCard() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const editMovie = () => {
    setEdit(!edit);
  };

  const submitReview = () => {
    Axios.post(
      "http://localhost:3001/api/insert",
      {
        movieName: movieName,
        movieReview: review,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setMovieName("");
        setReview("");
        setMovieReviewList([
          ...movieReviewList,
          { name: movieName, review: review },
        ]);
      }
    });
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieReviewList(response.data);
      setLoading(false);
    });
  }, [movieReviewList]);

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
                setMovieName(e.target.value);
              }}
              value={movieName}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your description"
              onChange={(e) => {
                setReview(e.target.value);
              }}
              value={review}
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
              {movieReviewList.map((value, i) => {
                return (
                  <div key={i}>
                    <Fade
                      durtion={1200}
                      cascade
                      damping={0.02}
                      triggerOnce // to present each element on itself while moving down
                      direction="up"
                    >
                      <Card className="text-center">
                        <Card.Header style={{ margin: "auto" }}>
                          Information Card
                        </Card.Header>
                        <Card.Body>
                          <Card.Title>
                            {edit ? (
                              <Form.Control
                                type="text"
                                defaultValue={value.name}
                                onChange={(e) => {
                                  setNewReview(e.target.value);
                                }}
                              />
                            ) : (
                              <div>{value.name}</div>
                            )}
                          </Card.Title>
                          <Card.Text>{value.review}</Card.Text>
                          <Button
                            variant="danger"
                            onClick={() => {
                              deleteReview(value.name);
                            }}
                          >
                            Delete
                          </Button>
                          <div>{newReview}</div>
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
