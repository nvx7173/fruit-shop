import React from "react";
import "./style.css";
import backgroundVideo from "../../images/bg-video.mp4";
import imgbackgroundVideo from "../../images/img-item.png";
import { FaShoppingCart } from "react-icons/fa";
import * as Scroll from "react-scroll";
import { animateScroll as scroll } from "react-scroll";

const BackgroundVideo = () => {
  const scrollTo = () => {
    scroll.scrollTo(700);
  };
  return (
    <div className="bg">
      <div className="bg-video">
        <video
          playsinline="playsInline"
          autoplay="autoplay"
          muted="muted"
          loop="loop"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>
      <div className="detail">
        <div className="left-content">
          <h1>FRESH FRUIT</h1>

          <h style={{ fontStyle: "italic" }}>
            Chào mừng bạn đến với cửa hàng của chúng tôi <br></br>
            Nơi cung cấp nguồn rau xanh, hoa quả tươi sạch và nguyên chất cho
            gia đình bạn
          </h>
          <br></br>
          <button>
            <a style={{ color: "#fff", fontSize: "20px" }} onClick={scrollTo}>
              Đi mua sắm |<FaShoppingCart />
            </a>
          </button>
        </div>
        <div className="right-content">
          <img src={imgbackgroundVideo} />
        </div>
      </div>
    </div>
  );
};

export default BackgroundVideo;
