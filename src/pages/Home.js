import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import latte from "../assets/latte.jpg";
import cappuchino from "../assets/cappuchino.webp";
import mocha from "../assets/mocha.webp";
import red_velvet from "../assets/red velvet.jpg";
import carousel1 from "../assets/carousel-1.avif";
import carousel2 from "../assets/Carousel-2.jpg";
import carousel3 from "../assets/carousel-3.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const items = [
    {
      src: latte,
      altText: "Latte",
      caption: "Latte",
    },
    {
      src: cappuchino,
      altText: "Cappuchino",
      caption: "Cappuchino",
    },
    {
      src: mocha,
      altText: "Mocha",
      caption: "Mocha",
    },
    {
      src: red_velvet,
      altText: "Red Velvet",
      caption: "Red Velvet",
    },
  ];


  return (
    <div className="home-page">
      <div className="hero-section py-5 text-center text-light">
        <Container>
          <h1 className="fw-bold mb-3">
            Enjoy The Most{" "}
            <span className="text-warning">Delicious Coffee</span>
          </h1>
          <Container className="text-center mt-5">
            <p className="lead">
              Start Your Day With Coffee, Enhancing Productivity And Mood. Its
              Invigorating Aroma Sets A Focused Tone For Tackling Tasks With
              Renewed Energy And Positivity.
            </p>
          </Container>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            {/* Carousel Indicators */}
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>

            
            {/* Carousel Inner */}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={carousel1} className="d-block w-100" alt="Slide 1" />
              </div>
              <div className="carousel-item">
                <img
                  src={carousel2}
                  className="d-block w-100"
                  alt="Slide 2"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carousel3}
                  className="d-block w-100"
                  alt="Slide 3"
                />
              </div>
            </div>

            {/* Carousel Controls */}
            
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <Button color="warning" size="lg" className="mt-4 px-5 py-2"
          onClick={() => navigate("/dashboard/menu")}>
            Order Now
          </Button>
        </Container>
      </div>

      {/* Card Section */}
      <Container className="favorite-item mb-5 mt-5">
      <div className="text-center mt-5 mb-4 text-light border-bottom border-light pb-2">
        <h2 className="bootstrap-favorite-heading">Our Favorite Menu</h2>
      </div>
        <Row>
          {[latte, cappuchino, mocha, red_velvet].map((image, index) => (
            <Col md={3} key={index}>
              <Card className="mb-4 shadow-sm" style={{ height: "100%" }}>
                <div className="position-relative">
                  <img
                    src={image}
                    className="card-img-top rounded"
                    alt={`Card ${index}`}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="position-absolute top-0 end-0 bg-warning p-2 rounded-start">
                    <h5 className="mb-0 text-dark">Favorite</h5>
                  </div>
                </div>
                <CardBody>
                  <CardTitle tag="h5" className="fw-bold">
                    {items[index].caption}
                  </CardTitle>
                  <CardText>
                    A description of {items[index].caption.toLowerCase()}.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
