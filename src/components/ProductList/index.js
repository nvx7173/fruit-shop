import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

import "./style.css";

const ProductList = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="product">
      <Container>
        <p className="product-title">Sản phẩm nổi bật</p>
        <Row>
          {product.products.map((item) => (
            <Col md={3} className="product-shadow">
              <Link to={`/${item.slug}/${item._id}/p`}>
                <div className="productItem">
                  <div className="productItemImg">
                    <img src={item.productPictures[0].img} />
                  </div>
                  <div className="productName">
                    <p>{item.name}</p>
                  </div>
                  <div className="productRatting">
                    <div>
                      <AiFillStar className="starIcon" />
                      <AiFillStar className="starIcon" />
                      <AiFillStar className="starIcon" />
                      <AiFillStar className="starIcon" />
                      <AiFillStar className="starIcon" />
                    </div>
                  </div>
                  <div className="productPrice">
                    <p>{item.price} đ</p>
                  </div>
                  <br></br>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;
