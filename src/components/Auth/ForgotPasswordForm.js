import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import Layout from '../layout/layout';
import { FaEnvelope } from 'react-icons/fa';
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

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/forgot-password`, { email });
      if (res.data.status) {
        toast.error(res.data.message);
      } else {
        toast.success("Reset password Email sent successfully,check your Gmail");
        setTimeout(() => {
          navigate('/login');
        }, 5000);         
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title={'Soha&Fatmaas - Forgot Password'}>
      <Container>
        <Form
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleForgotPassword}
        >
          <Title>Forgot Password</Title>
          <InputContainer>
            <InputWrapper>
            <InputIcon>
                <FaEnvelope />
              </InputIcon>
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
          </InputContainer>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            Send Reset
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export default ForgotPasswordForm;
