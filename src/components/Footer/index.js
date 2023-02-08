import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GoLocation } from "react-icons/go";
import { AiOutlineMail, AiFillPhone, AiOutlineArrowUp } from "react-icons/ai";
import * as Scroll from "react-scroll";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import "./style.css";

const Footer = (props) => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };
  return (
    <div className="contact">
      <Container className="contact-container">
        <Row>
          <Col md={3}>
            <h1>Liên hệ</h1>
            <div>
              <div>
                <span>
                  <GoLocation />
                </span>
                <span className="contact-text">TP Vinh -Nghệ An</span>
              </div>
              <div>
                <span>
                  <AiOutlineMail />
                </span>
                <span className="contact-text">fruitshop@gmail.com</span>
              </div>
              <div>
                <span>
                  <GoLocation />
                </span>
                <span className="contact-text">0971824617</span>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <h1>Thông tin</h1>
            <div>
              <div>
                <span>
                  <GoLocation />
                </span>
                <span className="contact-text">Về chúng tôi</span>
              </div>
              <div>
                <span>
                  <GoLocation />
                </span>
                <span className="contact-text">Liên hệ chúng tôi</span>
              </div>
              <div>
                <span>
                  <GoLocation />
                </span>
                <span className="contact-text">Mã giảm giá</span>
              </div>
              <div>
                <span>
                  <GoLocation />
                </span>
                <span className="contact-text">FAQ's</span>
              </div>
              <div>
                <span>
                  <GoLocation />
                </span>
                <span className="contact-text">Sản phẩm đặc biệt</span>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <h1>Danh mục</h1>
            <div>
              <div>
                <span>
                  <GoLocation />
                </span>
                <span className="contact-text">Quả</span>
              </div>
              <div>
                <span>
                  <GoLocation />
                </span>
                <span className="contact-text">Củ</span>
              </div>
              <div>
                <span>
                  <GoLocation />
                </span>
                <span className="contact-text">Hạt</span>
              </div>
              <div>
                <span>
                  <GoLocation />
                </span>
                <span className="contact-text">Rau</span>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <h1>Follow us</h1>
            <div>
              <div>
                <span>
                  <GoLocation />
                </span>
                <span className="contact-text">facebook.com/fruitshop</span>
              </div>
              <div>
                <span>
                  <GoLocation />
                </span>
                <span className="contact-text">fruitshop@gmail.com</span>
              </div>
            </div>
          </Col>
        </Row>
        <button style={{ backgroundColor: "#115969" }}>
          <a style={{ color: "#fff", fontSize: "20px" }} onClick={scrollToTop}>
            <AiOutlineArrowUp />
          </a>
        </button>
        <h6>
          Copyright © - 2020 by Group One - Information Technology Industry -
          Vinh University
        </h6>
      </Container>
    </div>
  );
};

export default Footer;
