import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Fade } from "react-awesome-reveal";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import "../App.css";
import Spinner from "react-bootstrap/Spinner";

function Registration() {
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
    Axios.post("https://crud-back-end-node.herokuapp.com/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
    setMovieReviewList([
      ...movieReviewList,
      { name: movieName, review: review },
    ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(
      `https://crud-back-end-node.herokuapp.com/api/delete/${movie}`
    );
  };

  const updateReview = (movie) => {
    Axios.put("https://crud-back-end-node.herokuapp.com/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  useEffect(() => {
    setTimeout(setLoading, 2000, false);
    //setLoading(false);
  }, [movieReviewList]);

  useEffect(() => {
    Axios.get("https://crud-back-end-node.herokuapp.com/api/get").then(
      (response) => {
        setMovieReviewList(response.data);
      }
    );
  }, []);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Movie Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Review</Form.Label>
          <Form.Control
            type="text"
            placeholder="review"
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </Form.Group>
        <Button onClick={submitReview}>Submit</Button>
        <br />
        <div className="wrapper">
          {loading ? (
            <Spinner
              animation="grow"
              className="spinner1"
              // style={{ color: "red" }}
            />
          ) : (
            <div>
              {movieReviewList.map((value) => {
                return (
                  <div>
                    <Fade
                      durtion={1200}
                      cascade
                      damping={0.02}
                      triggerOnce // to present each element on itself while moving down
                      direction="up"
                    >
                      <Card className="text-center">
                        <Card.Header style={{ margin: "auto" }}>
                          Movies
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
                            variant="primary"
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

export default Registration;
