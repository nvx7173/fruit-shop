import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems } from "../../actions";
import Layout from "../../components/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";
import Card from "../../components/UI/Card";
import CartPage from "../CartPage";
import AddressForm from "./AddressForm";
import { sendMailAction } from "../../actions";
import "./style.css";

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="Sửa địa chỉ"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br />
            </div>
            {adr.selected && (
              <MaterialButton
                title="Giao đến địa chỉ này"
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, selectPaymentOption] = useState(false);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    selectPaymentOption(true);
  };
  const notifyOrder = () => toast("Thành công! Đang đến trang hóa đơn...\n");
  const sendMail = () => {
    const form = new Object();
    user.address.forEach((item, index) => {
      form.fullname = item.name;
      form.mobileNumber = item.mobileNumber;
      form.address = item.address;
    });
    const cartItem = Object.values(cart.cartItems);
    const cartTotal = { name: "", totalAmount: 0, qty: 0 };

    cartItem.map((x) => {
      cartTotal.name += x.name + ", ";
      cartTotal.totalAmount += x.price * x.qty;
      cartTotal.qty += x.qty;
    });
    const cartTotalArray = [];
    cartTotalArray.push(cartTotal);
    cartTotalArray.forEach((item, index) => {
      form.name = item.name;
      form.totalAmount = item.totalAmount;
      form.qty = item.qty;
    });
    dispatch(sendMailAction(form));
  };
  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };
    dispatch(addOrder(payload));
    setConfirmOrder(true);
    sendMail();
    notifyOrder();

    setTimeout(() => {
      props.history.push("/account/orders");
    }, 4000);
  };
  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
    //user.address.length === 0 && setNewAddress(true);
  }, [user.address]);

  return (
    <Layout>
      <ToastContainer autoClose={3000} />
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          <CheckoutStep
            stepNumber={""}
            title={"Thông tin khách hàng"}
            active={!confirmAddress && auth.authenticate}
            body={
              auth.authenticate ? (
                <div style={{ padding: "30px 0", textAlign: "center" }}>
                  <div className="loggedInId">
                    <p
                      style={{
                        fontWeight: 500,
                        fontSize: "20px",
                        color: "#1b66df",
                      }}
                    >
                      Họ tên người đặt hàng: {auth.user.fullname}
                    </p>
                    <p
                      style={{
                        fontWeight: 500,
                        fontSize: "16px",
                        color: "#1b66df",
                      }}
                    >
                      Email: {auth.user.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <MaterialInput label="Email" />
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={""}
            title={"Địa chỉ giao hàng"}
            active={!confirmAddress && auth.authenticate}
            body={
              <div>
                {confirmAddress ? (
                  <div className="stepCompleted">{` ${selectedAddress.name} - ${selectedAddress.address}`}</div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </div>
            }
          />

          {/* AddressForm */}
          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : auth.authenticate ? (
            <CheckoutStep
              stepNumber={"+"}
              title={"Thêm địa chỉ mới"}
              active={!confirmAddress && auth.authenticate}
              onClick={() => setNewAddress(true)}
            />
          ) : null}

          <CheckoutStep
            stepNumber={""}
            title={"Chi tiết đặt hàng"}
            active={!confirmAddress && auth.authenticate}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="count">
                  Hóa đơn thanh toán gồm {Object.keys(cart.cartItems).length}{" "}
                  sản phẩm
                </div>
              ) : null
            }
          />

          <Card>
            <div className="flexRow sb continue">
              <MaterialButton
                title="Tiếp tục"
                onClick={userOrderConfirmation}
                style={{ width: "200px" }}
              ></MaterialButton>
            </div>
          </Card>

          <CheckoutStep
            stepNumber={""}
            title={"Xác nhận đơn hàng"}
            active={paymentOption}
            body={
              paymentOption && (
                <div className="confirm">
                  <input type="radio" name="paymentOption" value="cod"></input>
                  <span style={{ marginLeft: "15px" }}>
                    Tích vào để xác nhận đơn hàng
                  </span>
                  <MaterialButton
                    className="order-confirm"
                    title="Xác nhận hóa đơn"
                    onClick={onConfirmOrder}
                  ></MaterialButton>
                </div>
              )
            }
          />
        </div>

        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default CheckoutPage;
