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
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { GrSort, GrSearch } from "react-icons/gr";
import FormControl from "react-bootstrap/FormControl";
import { MdDateRange } from "react-icons/md";
import DateRangePicker from "react-bootstrap-daterangepicker";
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
// import "bootstrap/dist/css/bootstrap.css";
// you will also need the css that comes with bootstrap-daterangepicker
import "bootstrap-daterangepicker/daterangepicker.css";

function BookPage() {
  const [name, setName] = useState("");
  const [information, setInformation] = useState("");
  const [cardList, setCardList] = useState([]);
  const [newName, setNewName] = useState("");
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [, setFetch] = useState(false);
  const [image, setImage] = useState("");
  let navigate = useNavigate();
  const [sort, setSort] = useState("title");
  const [subject, setSubject] = useState("All");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setLoading(false);
      setCardList(response.data.result);
      console.log(response.data);
    });
  }, []);

  const bookInformation = (value) => {
    navigate("/bookInfo", { state: { ...value } });
  };

  const handleSort = (e) => {
    setSort(e);
  };

  const handleSubject = (e) => {
    setSubject(e);
  };

  const handleSearch = () => {
    Axios.post("http://localhost:3001/api/bookSearch", {
      search: search,
      sort: sort,
      subject: subject,
      startDate: date.startDate,
      endDate: date.endDate,
    }).then((response) => {
      console.log(response.data);
      setCardList(response.data);
    });
  };

  const handleDate = (e, picker) => {
    const start = picker.startDate._d;
    const end = picker.endDate._d;
    const startDate = `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`;
    const endDate = `${end.getFullYear()}-${end.getMonth()}-${end.getDate()}`;
    console.log(startDate, endDate);
    setDate({ startDate: startDate, endDate: endDate });
    console.log(date);
  };

  return (
    <div>
      <Button onClick={handleSearch} className={styles.searchButton}>
        <GrSearch />
      </Button>

      <Row style={{ display: "inline-block" }}>
        <FormControl
          type="search"
          placeholder="Search"
          className={styles.search}
          aria-label="Search"
          onChange={(event) => setSearch(event.target.value)}
        />
        <DropdownButton
          variant="success"
          onChange={(event) => setSort(event.target.value)}
          style={{ display: "inline" }}
          id="dropdown-basic-button"
          className={styles.sort}
          title={sort != "" ? sort : <GrSort style={{ color: "white" }} />}
          onSelect={handleSort}
        >
          <Dropdown.Item eventKey="title">Title</Dropdown.Item>
          <Dropdown.Item eventKey="author">Author</Dropdown.Item>
        </DropdownButton>

        <DropdownButton
          variant="warning"
          onChange={(event) => setSort(event.target.value)}
          style={{ display: "inline" }}
          id="dropdown-basic-button"
          className={styles.sort}
          title={
            subject != "" ? subject : <GrSort style={{ color: "white" }} />
          }
          onSelect={handleSubject}
        >
          <Dropdown.Item eventKey="All">All</Dropdown.Item>
          <Dropdown.Item eventKey="Science">Science</Dropdown.Item>
          <Dropdown.Item eventKey="Law">law</Dropdown.Item>
          <Dropdown.Item eventKey="History">History</Dropdown.Item>
          <Dropdown.Item eventKey="Business">Business</Dropdown.Item>
        </DropdownButton>

        <DateRangePicker
          onApply={(e, picker) => handleDate(e, picker)}
          initialSettings={{ startDate: "1/1/2014", endDate: "3/1/2014" }}
        >
          <button
            style={{
              display: "inline-block",
              width: "40px",
              backgroundColor: "white",
            }}
          >
            <MdDateRange />
          </button>
        </DateRangePicker>
      </Row>
      <div className="wrapper">
        {loading ? (
          <Spinner animation="grow" className="spinner1" />
        ) : (
          <div className={styles.bookCard}>
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
                    <Card className={`${styles.card}`}>
                      <Card.Header style={{ margin: "auto" }}>
                        {value.subject}
                      </Card.Header>
                      <Card.Body>
                        <img src={value.image} className={styles.bookImage} />
                        <div className={styles.bookName}>{value.title}</div>
                        <div className={styles.author}>
                          Author:{" "}
                          <span className={styles.authorCustom}>
                            {value.author}
                          </span>
                        </div>
                        <div>{value.publicationDate.substring(0, 10)}</div>
                        <div className={styles.status}>
                          {value.numberOfCopies > 0 ? (
                            <div style={{ color: "green" }}>Available</div>
                          ) : (
                            <div style={{ color: "red" }}>Not Available</div>
                          )}
                        </div>
                      </Card.Body>
                      <Button
                        className={"original-button"}
                        onClick={() => bookInformation(value)}
                      >
                        More Details
                      </Button>
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
