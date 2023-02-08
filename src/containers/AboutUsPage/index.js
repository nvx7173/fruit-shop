import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import BackgroundVideo from "../../components/BackgroundVideo";
import Footer from "../../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import xuhuong from "../../images/xuhuong.png";
import mohinh from "../../images/mohinh.jpg";
import lienket from "../../images/lienket.jpg";
import dichvu from "../../images/dichvu.png";
import nvd from "../../images/nvd.jpg";
import nnl from "../../images/nnl.jpg";
import dda from "../../images/dda.jpg";
import thh from "../../images/thh.jpg";
import dth from "../../images/dth.jpg";
import "./style.css";
import Slider from "react-slick";

const AboutUsPage = () => {
  const settings = {
    infinite: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
  };
  return (
    <Layout>
      <div className="test"></div>
      <div className="bg-content">
        <h1
          style={{
            textAlign: "center",
            boxShadow: "5px -5px 15px rgba(0, 0, 0, 0.4)",
            margin: "0 120px",
            padding: "20px",
            color: "blueviolet",
            backgroundColor: "#fff",
          }}
        >
          Về công ty chúng tôi
        </h1>
        <Container>
          <Row>
            <Col md={6}>
              <div className="img-content align-content">
                <img src={xuhuong} />
              </div>
            </Col>
            <Col md={6}>
              <div className="align-content">
                <p>
                  <h3>Nắm bắt xu hướng khách hàng</h3>
                  Xã hội ngày càng phát triển, nhận thức của con người về sức
                  khoẻ ngày càng được nâng cao. Khi chất lượng cuộc sống càng
                  cao, nhu cầu dùng thực phẩm sạch càng lớn. Chính vì thế, việc
                  lựa chọn thực phẩm an toàn được người tiêu dùng đặt lên hàng
                  đầu.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="align-content">
                <p>
                  <h3>Mô hình kinh doanh</h3>
                  Sử dụng mô hình B2B (Business to Business) và
                  B2C(business-to-consumer)
                  <br></br>
                  B2B: Mô hình kinh doanh online giữa doanh nghiệp với doanh
                  nghiệp. Đối tượng khách hàng ở đây có thể là các doanh nghiệp
                  hoặc các đại lý hay cửa hàng tạp hóa quy mô lớn nhỏ.
                  <br></br>B2C: Mô hình kinh doanh online giữa doanh nghiệp với
                  cá nhân. Những cá nhân này chỉ có nhu cầu về hoa quả và muốn
                  mua để phục vụ nhu cầu của mình, không phát sinh thêm giao
                  dịch mua bán tiếp theo
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="img-content align-content">
                <img src={mohinh} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="img-content align-content">
                <img src={lienket} />
              </div>
            </Col>
            <Col md={6}>
              <div className="align-content">
                <p>
                  <h3>Đơn vị liên kết</h3>
                  Hợp tác xã nông nghiệp Nam Xuân Xanh
                  <br></br>- Địa chỉ: Xóm 1, Xã Nam Xuân, Huyện Nam Đàn, Tỉnh
                  Nghệ An <br></br> - Sản phẩm: Chanh, hoa thiên lý, rau lá hẹ,…
                  <br></br>Cửa hàng phân phối rau sạch VietFarm Đà Lạt <br></br>
                  - Địa chỉ: số 06, Nguyễn Sỹ Sách, TP.Vinh <br></br>- Sản phẩm:
                  cải xoăn, xà lách tím, bắp cải tím, ớt chuông, su hào, su su,
                  cà rốt, dưa chuột, đậu Cove,… <br></br>Công ty thực phẩm Đồng
                  Xanh
                  <br></br>- Địa chỉ: 34/23 Hoàng Ngọc Phách P. Phú Thọ Hòa Quận
                  Tân Phú <br></br>- Sản phẩm: Rau, củ, quả, trái cây, các loại
                  nấm,…
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div className="align-content">
                <p>
                  <h3>Dịch vụ</h3>- Đặt hàng, xử lý đơn hàng
                  <br></br>+ Đặt hàng qua điện thoại
                  <br></br>+Đặt hàng qua Fanpage<br></br>
                  Đặt hàng qua Website - Vận chuyển, giao hàng: + Giao hàng
                  thông qua bưu điện + Vận chuyển qua đơn vị chuyển phát nhanh:
                  Grab Food, Uber Food,.Gofood + Giao hàng qua xe khách
                </p>
              </div>
            </Col>
            <Col md={6}>
              <div className="img-content align-content">
                <img src={dichvu} />
              </div>
            </Col>
          </Row>
        </Container>

        <Container className="slider-content">
          <h1
            style={{
              textAlign: "center",
              boxShadow: "5px -5px 15px rgba(0, 0, 0, 0.4)",
              padding: "20px",
              marginBottom: "80px",
              color: "blueviolet",
              backgroundColor: "#fff",
            }}
          >
            Thành viên
          </h1>
          <Slider {...settings}>
            <div>
              <img src={nvd} />
            </div>
            <div>
              <img src={nnl} />
            </div>
            <div>
              <img src={dda} />
            </div>
            <div>
              <img src={thh} />
            </div>
            <div>
              <img src={dth} />
            </div>
          </Slider>
        </Container>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default AboutUsPage;
