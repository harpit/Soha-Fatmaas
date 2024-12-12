import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import styled, { keyframes } from 'styled-components';
import Image1 from '../../src/img/Black and Gold Vintage Style Cocktail Bar Restaurant Facebook Cover.png';
import Image2 from '../../src/img/Cream Floral Beauty Skincare Product Promotion Facebook Cover.png';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const Header = styled.header`
  .item {
    height: 80vh;
    position: relative;
  }
  .item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cover {
    padding: 75px 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
  }
  .header-content {
    position: relative;
    padding: 46px;
    overflow: hidden;
  }
  .line {
    content: "";
    display: inline-block;
    width: 100%;
    height: 90%;
    left: 0;
    top: 15px;
    position: absolute;
    border: 9px solid #735a1f;
    clip-path: polygon(0 0, 60% 0, 36% 100%, 0 100%);
  }
  h1 {
    font-size: 50px;
    font-weight: 600;
    margin: 5px 0 20px;
    word-spacing: 3px;
    color: #9d8b54;
    font-family: "Roboto", sans-serif;
  }
  h4 {
    font-size: 20px;
    font-weight: 300;
    line-height: 36px;
    color: #9d8b54;
    font-family: "Roboto", sans-serif;
  }
  .active h1 {
    animation: ${fadeInDown} 1s both 0.3s;
  }
  .active h4 {
    animation: ${fadeInUp} 1s both 0.3s;
  }
  .active .line {
    animation: ${fadeInLeft} 1s both 0.3s;
  }
  .owl-nav .owl-prev,
  .owl-nav .owl-next {
    position: absolute;
    top: 43%;
    opacity: 0;
    transition: all 0.4s ease-out;
    background: rgba(0, 0, 0, 0.5) !important;
    width: 40px;
    height: 40px;
    display: block;
    z-index: 1000;
    border-radius: 0;
    cursor: pointer;
  }
  .owl-nav .owl-prev {
    left: 15px;
  }
  .owl-nav .owl-next {
    right: 15px;
  }
  .owl-nav .owl-prev span,
  .owl-nav .owl-next span {
    font-size: 1.6875rem;
    color: #fff;
  }
  .header:hover .owl-prev {
    left: 0;
    opacity: 1;
  }
  .header:hover .owl-next {
    right: 0;
    opacity: 1;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 40px;
    }
    h4 {
      font-size: 18px;
    }
    .header-content {
      padding: 30px;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 30px;
    }
    h4 {
      font-size: 16px;
    }
    .header-content {
      padding: 20px;
    }
  }
`;

const HeaderSection = () => {
  return (
    <Header className="header">
      <OwlCarousel
        className="owl-theme"
        loop
        margin={10}
        dots={false}
        nav
        mouseDrag={false}
        autoplay
        autoplayTimeout={5000}
        autoplaySpeed={1000}
        smartSpeed={1000}
        animateOut="fadeOut"
        animateIn="fadeIn"
        responsive={{
          0: { items: 1 },
          600: { items: 1 },
          1000: { items: 1 }
        }}
      >
        <div className="item">
          <img
            src={Image1}
            alt="images not found"
          />
          <div className="cover">
            <div className="container">
              <div className="header-content">
                <div className="line animated bounceInLeft"></div>
                <h1>Your Elegant Fragrances</h1>
                <h4>
                Smell Good And Be Impressive!
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <img
            src={Image2}
            alt="images not found"
          />
          <div className="cover">
            <div className="container">
              <div className="header-content">
                <div className="line animated bounceInLeft"></div>
                <h1>Glowing skin,Naturally </h1>
                <h4>
                Neem Soap and See The Amazing Results
                </h4>
              </div>
            </div>
          </div>
        </div>
      </OwlCarousel>
    </Header>
  );
};

export default HeaderSection;
