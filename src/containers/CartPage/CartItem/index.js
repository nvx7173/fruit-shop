import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import "./style.css";
import { Link } from "react-router-dom";

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);

  const { _id, name, price, img } = props.cartItem;

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  };

  return (
    <div className="cart-item">
      <Row>
        <Col md={2}>
          <div className="cart-item-img">
            <img src={img} alt={""} />
          </div>
        </Col>
        <Col md={6}>
          <div className="cart-item-detail">
            <p className="cart-item-name">{name}</p>
            <div className="cart-item-action">
              <span
                style={{ cursor: "pointer" }}
                className="cart-item-remove"
                onClick={() => props.onRemoveCartItem(_id)}
              >
                Xóa
              </span>
              <span className="cart-item-back">
                <Link to="/">Mua sau</Link>
              </span>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="cart-item-quantity">
            <div>
              <span className="price-item-title">Đơn giá: </span>
              <span className="price-item">{price} vnđ</span>
            </div>
            <div className="count">
              <p className="count-title">Chọn số lượng (Kg)</p>
              <div className="choose-quantity">
                <span
                  className="action-btn action-btn-incre"
                  onClick={onQuantityDecrement}
                >
                  <AiFillMinusCircle />
                </span>
                <input
                  className="item-quantity form-control"
                  value={qty}
                  readOnly
                />
                <span
                  className="action-btn action-btn-decre"
                  onClick={onQuantityIncrement}
                >
                  <AiFillPlusCircle />
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartItem;
