import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import CategoryList from "../../components/CategoryList";
import ProductList from "../../components/ProductList";
import Footer from "../../components/Footer";
import "./style.css";

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <Layout>
      <div className="order-list">
        <h1 className="order-title">Các đơn hàng của tôi</h1>
        <Container style={{ paddingBottom: "300px" }}>
          <Row className="title">
            <Col>Ảnh sản phẩm</Col>
            <Col>Tên sản phẩm</Col>
            <Col>Đơn giá</Col>
            <Col>Số lượng</Col>
            <Col>Ngày đặt hàng</Col>
            <Col>Trạng thái đơn hàng</Col>
          </Row>
          {user.orders.length > 0 ? (
            user.orders.map((order) => {
              return order.items.map((item) => (
                <Row className="order-item">
                  <Col className="order-item-col">
                    <div className="order-img">
                      <img src={item.productId.productPictures[0].img} />
                    </div>
                  </Col>
                  <Col className="order-item-col">
                    <div className="order-name">{item.productId.name}</div>
                  </Col>
                  <Col className="order-item-col">
                    <div className="order-price">{item.payablePrice} Vnđ</div>
                  </Col>
                  <Col className="order-item-col">
                    <div className="order-qty">{item.purchasedQty} Kg</div>
                  </Col>
                  <Col className="order-item-col">
                    <div className="order-date">
                      {order.orderStatus[0].date}
                    </div>
                  </Col>
                  <Col className="order-item-col">
                    <div className="order-status">
                      {order.paymentStatus == "pending"
                        ? "Đang giao hàng..."
                        : ""}
                    </div>
                  </Col>
                </Row>
              ));
            })
          ) : (
            <h3
              style={{
                margin: "20px",
                padding: "30px",
                boxShadow: "5px 0px 15px rgba(0, 0, 0, 0.6)",
                backgroundColor: "#fff",
                color: "#0729a3",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Không có đơn hàng nào
            </h3>
          )}
        </Container>
      </div>
      <div className="footer-detail">
        <Footer></Footer>
      </div>
    </Layout>
  );
};

export default OrderPage;
