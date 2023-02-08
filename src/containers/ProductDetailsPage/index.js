import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import Layout from "../../components/Layout";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineShopping, AiOutlineShoppingCart } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";
import { addToCart } from "../../actions";
import { Container, Row, Col, Button } from "react-bootstrap";
import CategoryList from "../../components/CategoryList";
import ProductList from "../../components/ProductList";
import Footer from "../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const user = useSelector((state) => state.auth.user);
  const notifyLoginRequest = () => toast("Cần đăng nhập trước khi mua hàng!");
  useEffect(() => {
    const { productId } = props.match.params;
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  return (
    <Layout>
      <ToastContainer autoClose={2500} />
      <div className="bg-page">
        <Container className="product-detail">
          <Row>
            <Col md={6}>
              <div className="breed">
                <ul>
                  <li>
                    <a href="/">Home</a>
                    <IoIosArrowForward />
                  </li>
                  <li>
                    <a href="/">Category</a>
                    <IoIosArrowForward />
                  </li>
                  <li>
                    <a href="/">Product</a>
                    <IoIosArrowForward />
                  </li>
                  <li>
                    <a href="#">{product.productDetails.name}</a>
                  </li>
                </ul>
              </div>
              <div className="product-image">
                <img src={product.productDetails.productPictures[0].img} />
              </div>
            </Col>
            <Col md={3} className="detail-side">
              <span className="common-title">Chi tiết sản phẩm:</span>
              <h1 className="product-name">{product.productDetails.name}</h1>
              <span className="price-title">Giá sản phẩm:</span>
              <h3 className="product-price">
                {product.productDetails.price} Đ
              </h3>
              <span className="left-quantity-title">Số lượng còn lại: </span>
              <span className="product-quantity">
                {product.productDetails.quantity}
              </span>
              <span>Kg</span>

              <p className="description-title">Mô tả:</p>
              <p className="product-description">
                {product.productDetails.description}
              </p>
              <div className="flexRow">
                <MaterialButton
                  title="Mua ngay"
                  bgColor="rgb(18 18 154 / 94%)"
                  textColor="#ffffff"
                  style={{
                    marginRight: "5px",
                  }}
                  icon={<AiOutlineShopping />}
                  onClick={() => {
                    const { _id, name, price } = product.productDetails;
                    const img = product.productDetails.productPictures[0].img;
                    if (user.fullname != "") {
                      dispatch(addToCart({ _id, name, price, img }));
                      props.history.push(`/cart`);
                    } else {
                      notifyLoginRequest();
                    }
                  }}
                />
                <MaterialButton
                  title="Giỏ hàng"
                  bgColor="rgb(197 13 42)"
                  textColor="#ffffff"
                  style={{
                    marginLeft: "5px",
                  }}
                  icon={<AiOutlineShoppingCart />}
                  onClick={() => {
                    const { _id, name, price } = product.productDetails;
                    const img = product.productDetails.productPictures[0].img;
                    if (user.fullname != "") {
                      dispatch(addToCart({ _id, name, price, img }));
                      props.history.push(`/cart`);
                    } else {
                      notifyLoginRequest();
                    }
                  }}
                />
              </div>
            </Col>
            <Col md={3} className="image-detail">
              <h6>Ảnh sản phẩm</h6>
              {product.productDetails.productPictures.map((thumb, index) => (
                <>
                  <Row>
                    <div className="image-detail-item">
                      <img src={thumb.img} alt={thumb.img} />
                    </div>
                  </Row>
                </>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-detail">
        <Footer></Footer>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
