import React from "react";
import { useNavigate } from "react-router-dom";

function BookInfoPage(props) {
  const { state } = useNavigate();

  return (
    <div>
      akhdfka
      {props.state}
      {state}
      {props.id}
    </div>
  );
}

export default BookInfoPage;
