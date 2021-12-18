import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "./bookInfoPage.module.css";

function BookInfoPage(props) {
  const location = useLocation();

  return (
    <div>
      <img src={location.state.image} className={styles.bookImage} />
      <div className={styles.bookName}>{location.state.name}</div>
      <div>{location.state.description}</div>
      <Button className={"original-button"}>Reserve The Book</Button>
    </div>
  );
}

export default BookInfoPage;
