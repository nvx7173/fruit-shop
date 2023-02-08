import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../components/Footer";
import { RiLuggageCartLine } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import { TiCancel } from "react-icons/ti";
import { BsFillChatDotsFill } from "react-icons/bs";
import contact from "../../images/contact.png";
import { Modal, Button } from "react-bootstrap";
import MyVerticallyCenteredModal from "../../components/UI/Modal";
import { contactUs } from "../../actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

const AboutUsPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const notifySend = () => toast("Gửi liên hệ thành công!");

  const contactForm = () => {
    const form = new Object();
    if (user) {
      if (title === "") {
        alert("Mời nhập tiêu đề liên hệ!");
        return;
      }
      if (content === "") {
        alert("Mời nhập nội dung liên hệ!");
        return;
      }
      form.fullname = user.fullname;
      form.email = user.email;
      form.title = title;
      form.content = content;
      dispatch(contactUs(form)).then(() => {
        notifySend();
      });
    }
  };

  return (
    <Layout>
      <ToastContainer autoClose={2500} />
      <div className="bg-content">
        <h1
          style={{
            textAlign: "center",
            boxShadow: "5px -5px 15px rgba(0, 0, 0, 0.4)",
            margin: "0px 120px 50px 120px",
            padding: "20px",
            color: "blueviolet",
            backgroundColor: "#fff",
          }}
        >
          Liên hệ với chúng tôi
        </h1>
        <Container className="contact-us">
          <Row>
            <h3 style={{ padding: "30px 0px" }}>
              Freshfruit có thể giúp gì cho bạn ?
            </h3>
          </Row>
          <Row>
            <Col md={4}>
              <div className="place-order place-order-item ">
                <span className="icon">
                  <RiLuggageCartLine />
                </span>
                <a href="#" className="place-order place-order-item-title">
                  Tôi muốn biết đơn hàng của tôi hiện ở đâu ?
                </a>
                <p className="place-order-content">
                  Cập nhật trạng thái đơn hàng với công cụ kiểm tra đơn hàng tực
                  tuyến
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="back-order place-order-item">
                <span className="icon">
                  <GiReturnArrow />
                </span>
                <a href="#" className="place-order place-order-item-title">
                  Tôi muốn trả sản phẩm
                </a>
                <p className="place-order-content">
                  Sử dụng phiếu đăng ký đổi trả trực tuyến để bắt đầu đổi trả
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="cancel place-order-item">
                <span className="icon">
                  <TiCancel />
                </span>
                <a href="#" className="place-order place-order-item-title">
                  Tôi muốn hủy đơn hàng
                </a>
                <p className="place-order-content">
                  Sử dụng phiếu đăng ký hủy đơn hàng trực tuyến để bắt đầu hủy
                  đơn hàng
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <p style={{ paddingTop: "15px" }}>Bạn vẫn còn câu hỏi khác ?</p>{" "}
              <br></br>
              <div>
                <a href="#">Tham khảo trung tâm hỗ trợ</a>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="contact-us chat-us">
          <h3 style={{ padding: "30px 0px" }}>Liên hệ với Freshfruit ?</h3>
          <Row>
            <Col md={4} className="align-order">
              <img src={contact} />
            </Col>
            <Col md={8} className="align-order">
              <p>
                Bạn đang cần hỗ trợ hay cần đóng góp ý kiến cho Bộ phận Chăm sóc
                Khách hàng? Hãy liên hệ với chúng tôi qua số Hotline hoặc dịch
                vụ Chat trực tuyến miễn phí. Chúng tôi sẽ cung cấp giải pháp cho
                vấn đề của bạn nhanh nhất có thể! <br></br>
                Hotline chăm sóc khách mua hàng 24/7: 19001007 (1,000đ/phút)
                Chat trực tuyến 24/7 **Nếu bạn là Nhà bán hàng, tham khảo Trung
                tâm hỗ trợ Nhà bán hàng tại đây, hoặc liên hệ Hotline 1900 636
                857
                <div>
                  <button
                    onClick={
                      user.fullname
                        ? () => setModalShow(true)
                        : () => alert("Mời đăng nhập để liên hệ với chúng tôi!")
                    }
                  >
                    <span
                      className="icon"
                      style={{ color: "#fff", paddingRight: "10px" }}
                    >
                      <BsFillChatDotsFill />
                    </span>
                    Chat với chúng tôi
                  </button>
                </div>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer></Footer>
      <MyVerticallyCenteredModal
        size={"lg"}
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <h1 className="form-title flex-item">Liên hệ</h1>
        <p>Tiêu đề</p>
        <input
          className="form-control"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* ============================================================================= */}
        <p>Nội dung liên hệ</p>
        <textarea
          className="form-control"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {/* ============================================================================== */}

        {/* =============================================================================== */}
        <Button
          className="form-btn"
          onClick={contactForm}
          variant="contained"
          color="primary"
        >
          Gửi
        </Button>
      </MyVerticallyCenteredModal>
    </Layout>
  );
};

export default AboutUsPage;
