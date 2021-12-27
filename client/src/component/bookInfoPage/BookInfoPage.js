import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "./bookInfoPage.module.css";
import Axios from "axios";

function BookInfoPage(props) {
  const location = useLocation();

  const checkoutBook = () => {
    const current = new Date();
    const date = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`;

    Axios.post(
      "https://library-system-back-end.herokuapp.com/api/checkoutBook",
      {
        isbn: location.state.ISBN,
        copyNumber: location.state.numberOfCopies,
        checkoutDate: date,
        returnDate: null,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      console.log(response);
      Axios.put(
        "https://library-system-back-end.herokuapp.com/api/decrementBook",
        {
          isbn: location.state.ISBN,
          numberOfCopies: location.state.numberOfCopies,
        }
      );
    });
  };

  const reserveBook = () => {
    const current = new Date();
    const date = `${current.getFullYear()}-${
      current.getMonth() + 1
    }-${current.getDate()}`;

    Axios.post(
      "https://library-system-back-end.herokuapp.com/api/reserveBook",
      {
        isbn: location.state.ISBN,
        reservationDate: date,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.bookContainer}>
          <img src={location.state.image} className={styles.bookImage} />
          <div className={styles.bookName}>{location.state.title}</div>
          <div>
            {location.state.numberOfCopies > 0 ? (
              <Button onClick={checkoutBook} className={"original-button"}>
                Check Out The Book
              </Button>
            ) : (
              <Button onClick={reserveBook} variant="warning">
                Reserve The Book
              </Button>
            )}
          </div>
        </div>
        <div className={styles.description}>
          <p>
            <span className={styles.bookBullets}>Author: </span>
            {location.state.author}
          </p>
          <p>
            <span className={styles.bookBullets}>Publication Date: </span>
            {location.state.publicationDate.substring(0, 10)}
          </p>
          <p>
            <span className={styles.bookBullets}>Number of Copies: </span>
            {location.state.numberOfCopies}
          </p>
          <p>
            <span className={styles.bookBullets}>Rack Number: </span>
            {location.state.rackNumber}
          </p>
          <p>
            <span className={styles.bookBullets}>Description: </span>
            lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit
            amet lorem et lorem lorem ipsum dolor sit amet, consectetur adip
            lorem ipsum dolor sit amet lorem et lorem lorem ipsum dolor sit
            amet, consectetur adip lorem ipsum dolor sit amet lorem et lorem
            lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit
            amet lorem et lorem lorem ipsum dolor sit amet, consectetur adip
            lorem ipsum dolor sit amet lorem et lorem lorem ipsum dolor sit
            amet, consectetur adip lorem ipsum dolor sit amet lorem et lorem
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookInfoPage;
