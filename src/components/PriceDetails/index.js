import React from "react";
import Card from "../../components/UI/Card";
import Cart from "../../images/cart.png";
import Free from "../../images/free.jpg";
import "./style.css";

const PriceDetails = (props) => {
  return (
    <Card headerLeft={"Thông tin thanh toán"} style={{ maxWidth: "380px" }}>
      <div
        className="payment"
        style={{
          padding: "30px",
          boxSizing: "border-box",
        }}
      >
        <div className="payment-image">
          <img src={Cart} />
        </div>
        <div className="total-title">
          <p>Tổng sản phẩm trong giỏ hàng:</p>
        </div>
        <div className="total-product">
          <span>{props.totalItem} kg</span>
        </div>
        <div>
          <p className="total-price-title">Tạm tính:</p>
        </div>
        <div className="total-price">
          <p>{props.totalPrice} vnđ</p>
        </div>
        <div className="ship-title">
          <p>Phí vận chuyển: </p>
        </div>
        <div className="free-ship">
          <img src={Free} />
        </div>
        <div>
          <p className="total-price-title pay-title">Tổng tiền:</p>
        </div>
        <div className="total-price pay">
          <p>{props.totalPrice} vnđ</p>
        </div>
      </div>
    </Card>
  );
};

export default PriceDetails;
