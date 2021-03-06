import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Fade } from "react-awesome-reveal";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import styles from "./librarianHomePage.module.css";
import "../../App.css";
import Card from "react-bootstrap/Card";
import { GrSort, GrSearch } from "react-icons/gr";
import FormControl from "react-bootstrap/FormControl";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";

function LibrarianHomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loginStatus, setLogingStatus] = useState("");
  const [loginButton, setLoginButton] = useState("login");
  let navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);
  const [search, setSearch] = useState("");
  const [cardList, setCardList] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [bookISBN, setBookISBN] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookSubject, setBookSubject] = useState("");
  const [bookBarcodeNumber, setBookBarcodeNumber] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookURL, setBookURL] = useState("");
  const [bookPublishDate, setBookPublishDate] = useState("");
  const [bookRackNumber, setBookRackNumber] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookNumberOfCopies, setBookNumberOfCopies] = useState("");
  const [bookEdit, setBookEdit] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [reportOneList, setReportOneList] = useState([]);
  const [membersPenalty, setMembersPenalty] = useState([]);
  const [reportThreeList, setReportThreeList] = useState([]);
  const [reportFourList, setReportFourList] = useState([]);
  Axios.defaults.withCredentials = true; //must be written

  const handleModalAdd = () => {
    setBookEdit(false);
    setModalShow(true);
  };

  const handleModalEdit = (bookInfo) => {
    setBookEdit(bookInfo);
    setModalShow(true);
    console.log("hellow");
    setBookISBN(bookEdit.ISBN);
    setBookTitle(bookEdit.title);
    setBookSubject(bookEdit.subject);
    setBookBarcodeNumber(bookEdit.barcodeNumber);
    setBookAuthor(bookEdit.author);
    setBookPublishDate("");
    setBookRackNumber(bookEdit.rackNumber);
    setBookDescription(bookEdit.description);
    setBookNumberOfCopies(bookEdit.numberOfCopies);
    setBookURL(bookEdit.image);
  };

  const handleLoginButton = () => {
    setLoginButton("login");
  };
  const handleRegisterButton = () => {
    setLoginButton("register");
  };

  const handleBookManagement = () => {
    setLoginButton("bookManagement");
  };

  const handleReports = () => {
    setLoginButton("reports");
  };

  const handleOne = () => {
    setLoginButton("one");
  };

  const handleTwo = () => {
    setLoginButton("two");
  };
  const handleThree = () => {
    setLoginButton("three");
  };
  const handleFour = () => {
    setLoginButton("four");
  };

  useEffect(() => {
    const current = new Date().getFullYear();
    Axios.post("https://library-system-back-end.herokuapp.com/api/reportOne", {
      thisYear: current,
    }).then((response) => {
      console.log(response.data);
      console.log(current);
      setReportOneList(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(
      "https://library-system-back-end.herokuapp.com/api/reportThree"
    ).then((response) => {
      console.log("rhis is three", response.data);
      setReportThreeList(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(
      "https://library-system-back-end.herokuapp.com/api/reportFour"
    ).then((response) => {
      console.log("his is Four", response.data);
      setReportFourList(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(
      "https://library-system-back-end.herokuapp.com/api/membersAndPenalty"
    ).then((response) => {
      setMembersPenalty(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("https://library-system-back-end.herokuapp.com/api/get").then(
      (response) => {
        setCardList(response.data.result);
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("https://library-system-back-end.herokuapp.com/api/member").then(
      (response) => {
        setMemberList(response.data);
      }
    );
  }, []);

  useEffect(() => {
    Axios.get("https://library-system-back-end.herokuapp.com/login").then(
      (response) => {
        // if (response.data.loggedIn === true) {
        //   setLogingStatus(response.data.user[0].email);
        // }
      }
    );
  }, []);

  const handleSearch = () => {
    Axios.post(
      "https://library-system-back-end.herokuapp.com/api/memberSearch",
      {
        name: search,
      }
    ).then((response) => {
      setMemberList(response.data);
    });
  };

  const register = () => {
    Axios.post("https://library-system-back-end.herokuapp.com/register", {
      name: name,
      type: "member",
      nationalId: nationalId,
      studentId: studentId,
      email: email,
      password: password,
      creationDate: new Date().toISOString().substring(0, 10),
    }).then((response) => {
      navigate("/home");
    });
  };

  const addBook = () => {
    Axios.post("https://library-system-back-end.herokuapp.com/api/addBook", {
      isbn: bookISBN,
      title: bookTitle,
      subject: bookSubject,
      barcodeNumber: bookBarcodeNumber,
      author: bookAuthor,
      image: bookURL,
      rackNumber: bookRackNumber,
      publicationDate: bookPublishDate,
      numberOfCopies: bookNumberOfCopies,
      description: bookDescription,
    }).then((response) => {
      // setCardList({ ...cardList, title: bookTitle});
      console.log(response);
    });
  };

  const editBook = () => {
    Axios.put("https://library-system-back-end.herokuapp.com/api/editBook", {
      isbn: bookISBN,
      title: bookTitle,
      subject: bookSubject,
      barcodeNumber: bookBarcodeNumber,
      author: bookAuthor,
      image: bookURL,
      rackNumber: bookRackNumber,
      publicationDate: bookPublishDate,
      numberOfCopies: bookNumberOfCopies,
      description: bookDescription,
      oldisbn: bookEdit.ISBN,
    }).then((response) => {
      console.log(response);
      setFetch(true);
    });
  };

  const deleteMember = (email) => {
    Axios.delete(
      `https://library-system-back-end.herokuapp.com/api/deleteMember/${email}`
    ).then((response) => {
      const newList = memberList.filter((item) => item.email !== email);
      setMemberList(newList);
      console.log(response);
    });
  };

  const deleteBook = (ISBN) => {
    Axios.delete(
      `https://library-system-back-end.herokuapp.com/api/deleteBook/${ISBN}`
    ).then((response) => {
      const newList = cardList.filter((item) => item.ISBN !== ISBN);
      setCardList(newList);
      console.log(response);
    });
  };

  const userAuthenticated = () => {
    Axios.get("https://library-system-back-end.herokuapp.com/isUserAuth", {
      headers: { "x-access-token": localStorage.getItem("token") },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <Row>
        <Container fluid style={{ margin: "auto" }}>
          <Row className={styles.registrationButtons}>
            <Col className={styles.col}>
              <Button
                className={`${styles.createButton} ${
                  loginButton === "login" ? `${styles.createButtonActive}` : ""
                }`}
                onClick={handleLoginButton}
              >
                Add Member
              </Button>
            </Col>
            <Col className={styles.col}>
              <Button
                className={`${styles.createButton} ${
                  loginButton === "register"
                    ? `${styles.createButtonActive}`
                    : ""
                }`}
                onClick={handleRegisterButton}
              >
                Cancel Membership
              </Button>
            </Col>
            <Col className={styles.col}>
              <Button
                className={`${styles.createButton} ${
                  loginButton === "bookManagement"
                    ? `${styles.createButtonActive}`
                    : ""
                }`}
                onClick={handleBookManagement}
              >
                Books Management
              </Button>
            </Col>
            <Col className={styles.col}>
              <Button
                className={`${styles.createButton} ${
                  loginButton === "reports"
                    ? `${styles.createButtonActive}`
                    : ""
                }`}
                onClick={handleReports}
              >
                Reports
              </Button>
            </Col>
          </Row>
        </Container>
        <Col xs={5} style={{ margin: "auto" }}>
          {loginButton === "login" ? (
            <Form>
              <h3 className={styles.text}>Adding Member</h3>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>National ID</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter your National ID"
                  onChange={(e) => setNationalId(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Student ID</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Ener your student ID"
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter your email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button className="original-button" onClick={register}>
                Add Member
              </Button>
            </Form>
          ) : loginButton === "register" ? (
            <div className={styles.bookCard}>
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
              </Row>
              <h3 className={styles.text}>Canceling Membership</h3>
              {memberList.map((value, key) => {
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
                        <Card.Header
                          className={styles.cardHeader}
                          style={{ margin: "auto" }}
                        >
                          <div className={styles.bookName}>{value.name}</div>
                        </Card.Header>
                        <Card.Body style={{ color: "#00901f" }}>
                          {value.email}
                        </Card.Body>
                        {/* <Card.Body>{value.nationalID}</Card.Body> */}
                        <Button
                          variant="danger"
                          className={styles.deleteButton}
                          onClick={() => deleteMember(value.email)}
                        >
                          Delete Member
                        </Button>
                      </Card>
                    </Fade>
                  </div>
                );
              })}
            </div>
          ) : loginButton === "bookManagement" ? (
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
                          <div className={styles.status}>
                            {value.numberOfCopies > 0 ? (
                              <div style={{ color: "green" }}>Available</div>
                            ) : (
                              <div style={{ color: "red" }}>Not Available</div>
                            )}
                          </div>
                        </Card.Body>
                        <div style={{ display: "inline-block" }}>
                          <Button
                            variant="danger"
                            className={styles.deleteBookButton}
                            onClick={() => deleteBook(value.ISBN)}
                          >
                            Delete Book
                          </Button>
                          <Button
                            variant="warning"
                            className={styles.editBookButton}
                            onClick={() => handleModalEdit(value)}
                          >
                            <AiFillEdit /> Edit Book
                          </Button>
                        </div>
                      </Card>
                    </Fade>
                  </div>
                );
              })}
              <Button
                variant="success"
                className={styles.addBookButton}
                onClick={handleModalAdd}
              >
                <IoAddCircleOutline /> Add Book
              </Button>
            </div>
          ) : (
            <Container fluid className={styles.reportsContainer}>
              <Row>
                <Col className={styles.col}>
                  <Button
                    className={`${styles.createButton} ${
                      loginButton === "one"
                        ? `${styles.createButtonActive}`
                        : ""
                    }`}
                    onClick={handleOne}
                  >
                    New Mem With No Checks
                  </Button>
                </Col>
                <Col className={styles.col}>
                  <Button
                    className={`${styles.createButton} ${
                      loginButton === "two"
                        ? `${styles.createButtonActive}`
                        : ""
                    }`}
                    onClick={handleTwo}
                  >
                    Members With Penalty
                  </Button>
                </Col>
                <Col className={styles.col}>
                  <Button
                    className={`${styles.createButton} ${
                      loginButton === "three"
                        ? `${styles.createButtonActive}`
                        : ""
                    }`}
                    onClick={handleThree}
                  >
                    {"books > 3 and borrow > 120"}
                  </Button>
                </Col>
                <Col className={styles.col}>
                  <Button
                    className={`${styles.createButton} ${
                      loginButton === "four"
                        ? `${styles.createButtonActive}`
                        : ""
                    }`}
                    onClick={handleFour}
                  >
                    Returned Before Due Date
                  </Button>
                </Col>
              </Row>
            </Container>
          )}
          {loginButton === "one" ? (
            <div>
              {reportOneList.map((value, key) => {
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
                        <Card.Header
                          className={styles.cardHeader}
                          style={{ margin: "auto" }}
                        >
                          Name: {value.name}
                        </Card.Header>
                        <Card.Body>
                          <div className={styles.author}>
                            <span className={styles.authorCustom}>
                              National ID: {value.nationalID}
                            </span>
                          </div>
                          <div className={styles.author}>
                            <span className={styles.authorCustom}>
                              email: {value.email}
                            </span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Fade>
                  </div>
                );
              })}
            </div>
          ) : loginButton === "two" ? (
            <div>
              {membersPenalty.map((value, key) => {
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
                        <Card.Header
                          className={styles.cardHeader}
                          style={{ margin: "auto" }}
                        >
                          Name: {value.name}
                        </Card.Header>
                        <Card.Body>
                          <div className={styles.author}>
                            <span className={styles.authorCustom}>
                              National ID: {value.nationalID}
                            </span>
                          </div>
                          <div className={styles.author}>
                            Total Penalty:{" "}
                            <span style={{ color: "red" }}>
                              {value.penalty}
                            </span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Fade>
                  </div>
                );
              })}
            </div>
          ) : loginButton === "three" ? (
            <div>
              {reportThreeList.map((value, key) => {
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
                        <Card.Header
                          className={styles.cardHeader}
                          style={{ margin: "auto" }}
                        >
                          Name: {value.name}
                        </Card.Header>
                        <Card.Body>
                          <div className={styles.author}>
                            <span className={styles.authorCustom}>
                              National ID: {value.nationalID}
                            </span>
                          </div>
                          <div className={styles.author}>
                            <span className={styles.authorCustom}></span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Fade>
                  </div>
                );
              })}
            </div>
          ) : loginButton === "four" ? (
            <div>
              {reportFourList.map((value, key) => {
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
                        <Card.Header
                          className={styles.cardHeader}
                          style={{ margin: "auto" }}
                        >
                          Name: {value.name}
                        </Card.Header>
                        <Card.Body>
                          <div className={styles.author}>
                            <span className={styles.authorCustom}>
                              National ID: {value.nationalID}
                            </span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Fade>
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}

          <div>{loginStatus}</div>
        </Col>
      </Row>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3>
              {bookEdit != false ? (
                <div style={{ color: "#FFCA2C" }}>Editing Book</div>
              ) : (
                <div className={styles.text}>Adding Book</div>
              )}
            </h3>
            {console.log("book edit", bookEdit)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                defaultValue={bookEdit ? bookEdit.ISBN : ""}
                required
                type="number"
                placeholder="Enter Book ISBN"
                onChange={(e) => setBookISBN(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                defaultValue={bookEdit ? bookEdit.title : ""}
                required
                type="text"
                placeholder="Enter the book name"
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Book Subject</Form.Label>
              <Form.Control
                defaultValue={bookEdit ? bookEdit.subject : ""}
                required
                type="text"
                placeholder="Ener your student ID"
                onChange={(e) => setBookSubject(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Barcode Number</Form.Label>
              <Form.Control
                defaultValue={bookEdit ? bookEdit.barcodeNumber : ""}
                required
                type="number"
                placeholder="Enter the barcode number of the book"
                onChange={(e) => setBookBarcodeNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                defaultValue={bookEdit ? bookEdit.author : ""}
                required
                type="text"
                placeholder="Enter the book author"
                onChange={(e) => setBookAuthor(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rack Number</Form.Label>
              <Form.Control
                defaultValue={bookEdit ? bookEdit.rackNumber : ""}
                required
                type="number"
                placeholder="Enter the rack number of the book"
                onChange={(e) => setBookRackNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Publication Date</Form.Label>
              <Form.Control
                defaultValue={
                  bookEdit ? bookEdit.publicationDate.substring(0, 10) : ""
                }
                required
                type="text"
                placeholder="Enter the puplication date"
                onChange={(e) => setBookPublishDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Number Of Copies</Form.Label>
              <Form.Control
                defaultValue={bookEdit ? bookEdit.numberOfCopies : ""}
                required
                type="number"
                placeholder="Enter the number of copies "
                onChange={(e) => setBookNumberOfCopies(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Book Description</Form.Label>
              <Form.Control
                defaultValue={bookEdit ? bookEdit.description : ""}
                required
                type="text"
                placeholder="Enter the book author"
                onChange={(e) => setBookDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                defaultValue={bookEdit ? bookEdit.image : ""}
                required
                type="text"
                placeholder="Enter the image URL"
                onChange={(e) => setBookURL(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
        {bookEdit != false ? (
          <Button variant="warning" onClick={editBook}>
            Edit Book
          </Button>
        ) : (
          <Button className="original-button" onClick={addBook}>
            Add Book
          </Button>
        )}
      </Modal>
    </div>
  );
}

export default LibrarianHomePage;
