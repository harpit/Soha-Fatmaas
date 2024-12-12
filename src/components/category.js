import React from 'react';
import styled from 'styled-components';
import perfumeImage from '../../src/img/Perfume_Bottles-732x549-Thumbnail.avif';
import soapImage1 from '../../src/img/bakhoor.jpg';
import soapImage2 from '../../src/img/soap.webp'; 

const BoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
`;

const Box = styled.div`
  position: relative;
  width: 300px;
  height: 320px;
  margin: 20px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:hover div {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 280px;
  }

  @media (max-width: 480px) {
    width: 280px;
    height: 250px;
  }
`;

const Info = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 20px;
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 0.3s, transform 0.3s;
  text-align: center;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const Heading = styled.h1`
  text-align: center;
  padding-top: 20px;
  font-family: "Pacifico", cursive;
  font-weight: 500;
  font-size: 40px;
  color :#735a1f 
  
`;

const Para = styled.p`
  text-align: center;
  margin: 10px;
  padding-top: 10px;
  font-size: 16px;
  color: black;
  line-height: 1.8;
`;

const HoverBox = ({ backgroundImage, title, description }) => (
  <Box style={{ backgroundImage: `url(${backgroundImage})` }}>
    <Info>
      <h3>{title}</h3>
      <p>{description}</p>
    </Info>
  </Box>
);

const CategorySection = () => (
  <div>
    <Heading>Categories</Heading>
    <Para>Discover aromatic blends and luxurious scents crafted to elevate your senses and create an indulgent atmosphere.</Para>
    <BoxContainer>
      <HoverBox 
        backgroundImage={perfumeImage}
        title="Perfume"
        description="Explore a wide variety of perfumes." 
      />
      <HoverBox 
        backgroundImage={soapImage1} 
        title="Soap"
        description="Discover our collection of soaps." 
      />
      <HoverBox 
        backgroundImage={soapImage2} 
        title="Another Soap"
        description="More soaps to choose from." 
      />
    </BoxContainer>
  </div>
);

export default CategorySection;
