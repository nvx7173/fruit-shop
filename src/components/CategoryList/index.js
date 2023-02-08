import React, { useEffect } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { getAllCategory } from "../../actions";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const CategoryList = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const settings = {
    infinite: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    arrows: false,
  };
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderCategories = () => {
    let categoryNameList = [];
    for (let i = 0; i < category.categories.length; i++) {
      categoryNameList.concat(
        category.categories[i].children.map((x) =>
          categoryNameList.push({
            _id: x._id,
            name: x.name,
            slug: x.slug,
            img: x.categoryImage,
            type: x.type,
          })
        )
      );
    }
    return categoryNameList;
  };
  return (
    <div className="category-list">
      <Container>
        <Slider {...settings}>
          {renderCategories()
            ? renderCategories().map((x) => {
                return (
                  <div className="category-item">
                    <a href={`/${x.slug}?cid=${x._id}&type=${x.type}`}>
                      <div className="category-img">
                        <img src={x.img} />
                      </div>
                      <div className="category-title">
                        <span>{x.name}</span>
                      </div>
                    </a>
                  </div>
                );
              })
            : ""}
        </Slider>
      </Container>
    </div>
  );
};

export default CategoryList;
