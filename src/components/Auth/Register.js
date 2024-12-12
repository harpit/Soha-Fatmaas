import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from 'react-icons/fa';
import Layout from '../layout/layout';
import { FaMapLocation } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 1rem;
`;

const Form = styled(motion.form)`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  font-family: 'Roboto, sans-serif';
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  color: #735a1f;
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Pacifico', cursive;
  font-size: 40px;

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 10px;
  color: #735a1f;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 0.75rem 0.75rem 0.75rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #735a1f;
    outline: none;
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  background-color: #9d8b54;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background-color: #735a1f;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 0px;
  text-align: center;
`;

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleValidationSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!name) validationErrors.name = "Name is required";
    if (!email) validationErrors.email = "Email is required";
    else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) validationErrors.email = "Email is not valid";
    if (!password) validationErrors.password = "Password is required";
    else if (password.length < 8) validationErrors.password = "Password should be at least 8 characters long";
    if (!phone) validationErrors.phone = "Phone number is required";
    if (!address) validationErrors.address = "Address is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/register`, { name, email, password, phone, address });
      if (res.data.status) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000); 
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Layout title={"Soha&Fatmaas - Register"}>
      <Container>
        <Form
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleValidationSubmit}
        >
          <Title>Register</Title>
          <InputContainer>
            <InputWrapper>
              <InputIcon><FaUser /></InputIcon>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                whileFocus={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </InputWrapper>
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <InputWrapper>
              <InputIcon><FaEnvelope /></InputIcon>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                whileFocus={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </InputWrapper>
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <InputWrapper>
              <InputIcon><FaLock /></InputIcon>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                whileFocus={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </InputWrapper>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <InputWrapper>
              <InputIcon><FaPhoneAlt /></InputIcon>
              <Input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                whileFocus={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </InputWrapper>
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </InputContainer>
          <InputContainer>
            <InputWrapper>
              <InputIcon><FaMapLocation /></InputIcon>
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                whileFocus={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </InputWrapper>
            {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
          </InputContainer>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            Sign Up
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default RegisterForm;
