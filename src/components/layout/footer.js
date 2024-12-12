import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import bgImage from '../layout/img/Soha&Fatmaas.png';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

  body {
    font-family: 'Roboto', sans-serif;
  }
`;

const FooterContainer = styled.footer`
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 200px;
  color: white;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 30px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 10px;
  }
`;


const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const FooterLink = styled.a`
  color: white;
  margin: 0 15px;
  text-decoration: none;
  font-size: 1.1rem;

  &:hover {
    color: #735a1f;
  }

  @media (max-width: 480px) {
    margin: 0 10px;
    font-size: 0.9rem;
  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 10px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const SocialMediaIcon = styled.a`
  color: white;
  margin: 0 12px;
  font-size: 1.5rem;

  &:hover {
    color: #735a1f;
  }

  @media (max-width: 480px) {
    margin: 0 8px;
    font-size: 1.3rem;
  }
`;

const FooterCopyright = styled.div`
  font-size: 0.9rem;
  text-align: center;
  margin-top: 12px;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;
const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink href="#about">About</FooterLink>
        <FooterLink href="#services">Services</FooterLink>
        <FooterLink href="#contact">Contact</FooterLink>
        <FooterLink href="#privacy">Privacy Policy</FooterLink>
      </FooterLinks>
      <SocialMediaContainer>
        <SocialMediaIcon href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </SocialMediaIcon>
        <SocialMediaIcon href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </SocialMediaIcon>
        <SocialMediaIcon href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </SocialMediaIcon>
        <SocialMediaIcon href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </SocialMediaIcon>
      </SocialMediaContainer>
      <FooterCopyright>
        © 2024 Your Company. All Rights Reserved.
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer;
