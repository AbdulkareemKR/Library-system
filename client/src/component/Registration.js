import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import "../App.css";

function Registration() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieReviewList] = useState([]);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });
    setMovieReviewList([
      ...movieReviewList,
      { name: movieName, review: review },
    ]);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieReviewList(response.data);
    });
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
        {movieReviewList.map((value) => {
          return (
            <div>
              <Card className="text-center">
                <Card.Header style={{ margin: "auto" }}>Movies</Card.Header>
                <Card.Body>
                  <Card.Title>{value.name}</Card.Title>
                  <Card.Text>{value.review}</Card.Text>
                  <Button variant="primary">Whatch it!</Button>
                </Card.Body>
                <Card.Footer style={{ margin: "auto" }} className="text-muted">
                  x days ago
                </Card.Footer>
                <div>
                  <br />
                </div>
              </Card>
            </div>
          );
        })}
      </Form>
    </div>
  );
}

export default Registration;
