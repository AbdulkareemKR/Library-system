import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Fade } from "react-awesome-reveal";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import styles from "./homePage.module.css";
import "../../App.css";
import slide1 from "../images/slide1.jpg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function HomePage() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  return (
    <>
      <h1>Welcome to KFUPM library</h1>
      <div className={styles.container}>
        <div className={styles.flex}>
          <h2>Trending Books</h2>
          <Button size ="sm" className={styles.btn} href="../BookPage.js" variant="success">View All</Button>{''}
        </div>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={false} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          //deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div class="image-container increase-size">
            <Card style={{ width: '80%' }}>
              <Card.Img variant="top" src={slide1} />
              <Card.Body>
                <Card.Title>Card Title 1</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
          <div class="image-container increase-size">
            <Card style={{ width: '80%' }}>
              <Card.Img variant="top" src={slide1} />
              <Card.Body>
                <Card.Title>Card Title 2</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
          <div class="image-container increase-size">
            <Card style={{ width: '80%' }}>
              <Card.Img variant="top" src={slide1} />
              <Card.Body>
                <Card.Title>Card Title 3</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
          <div class="image-container increase-size">
            <Card style={{ width: '80%' }}>
              <Card.Img variant="top" src={slide1} />
              <Card.Body>
                <Card.Title>Card Title 4</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        </Carousel>
      </div>

      <div className={styles.container}>
      <div className={styles.flex}>
          <h2>Popular Books</h2>
          <Button size ="sm" className={styles.btn} href="../BookPage.js" variant="success">View All</Button>{''}
        </div>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={false} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          //deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div class="image-container increase-size">
            <Card style={{ width: '80%' }}>
              <Card.Img variant="top" src={slide1} />
              <Card.Body>
                <Card.Title>Card Title 1</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
          <div class="image-container increase-size">
            <Card style={{ width: '80%' }}>
              <Card.Img variant="top" src={slide1} />
              <Card.Body>
                <Card.Title>Card Title 2</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
          <div class="image-container increase-size">
            <Card style={{ width: '80%' }}>
              <Card.Img variant="top" src={slide1} />
              <Card.Body>
                <Card.Title>Card Title 3</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
          <div class="image-container increase-size">
            <Card style={{ width: '80%' }}>
              <Card.Img variant="top" src={slide1} />
              <Card.Body>
                <Card.Title>Card Title 4</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        </Carousel>
      </div>

      <div className={styles.container}>
      <div className={styles.flex}>
          <h2>New Books</h2>
          <Button size ="sm" className={styles.btn} href="../BookPage.js" variant="success">View All</Button>{''}
        </div>
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={false} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          //deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div class="image-container increase-size">
            <Card style={{ width: '80%' }}>
              <Card.Img variant="top" src={slide1} />
              <Card.Body>
                <Card.Title>Card Title 1</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
          <div class="image-container increase-size">
            <Card style={{ width: '80%' }}>
              <Card.Img variant="top" src={slide1} />
              <Card.Body>
                <Card.Title>Card Title 2</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
          <div class="image-container increase-size">
            <Card style={{ width: '80%' }}>
              <Card.Img variant="top" src={slide1} />
              <Card.Body>
                <Card.Title>Card Title 3</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
          <div class="image-container increase-size">
            <Card style={{ width: '80%' }}>
              <Card.Img variant="top" src={slide1} />
              <Card.Body>
                <Card.Title>Card Title 4</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        </Carousel>
      </div>

    </>
  );
}

export default HomePage;
