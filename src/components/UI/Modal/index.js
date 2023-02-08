import React from "react";
import { Modal, Container, Row, Col, Carousel } from "react-bootstrap";
import Apple from "../../../images/AppleCarousel.png";
import Orange from "../../../images/OrangeCarousel.png";
import "./style.css";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="modal-container">
        <Container>
          <Row>
            <Col md={6} className="carousel-side">
              <Carousel fade={true}>
                <Carousel.Item interval={2000}>
                  <img
                    className="d-block w-100"
                    src={Apple}
                    alt="Third slide"
                  />
                </Carousel.Item>
                <Carousel.Item interval={2000}>
                  <img
                    className="d-block w-100"
                    src={Orange}
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col md={6} className="form-side">
              {props.children}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
