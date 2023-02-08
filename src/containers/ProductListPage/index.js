import React from "react";
import Layout from "../../components/Layout";
import getParams from "../../utils/getParams";
import ProductPage from "./ProductPage";
import ProductByCategory from "../../components/ProductByCategory";
import BackgroundVideo from "../../components/BackgroundVideo";
import CategoryList from "../../components/CategoryList";
import Footer from "../../components/Footer";
import "./style.css";

const ProductListPage = (props) => {
  const renderProduct = () => {
    const params = getParams(props.location.search);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductByCategory {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = null;
    }

    return content;
  };

  return (
    <Layout>
      <BackgroundVideo></BackgroundVideo>
      <CategoryList></CategoryList>
      {renderProduct()}
      <Footer></Footer>
    </Layout>
  );
};

export default ProductListPage;
