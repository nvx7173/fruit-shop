import React from "react";
import Layout from "../../components/Layout";
import BackgroundVideo from "../../components/BackgroundVideo";
import CategoryList from "../../components/CategoryList";
import ProductList from "../../components/ProductList";
import Footer from "../../components/Footer";

const HomePage = (props) => {
  return (
    <Layout>
      <BackgroundVideo></BackgroundVideo>
      <CategoryList></CategoryList>
      <ProductList></ProductList>
      <Footer></Footer>
    </Layout>
  );
};

export default HomePage;
