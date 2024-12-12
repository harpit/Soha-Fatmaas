import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../layout/layout';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();

  
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
const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/api/auth/reset-password`, { token, password });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      <Form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
      >
        <Title>Reset Password</Title>
        <InputContainer>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
            initial={{ scale: 1 }}
            whileFocus={{ scale: 1.02 }}
          />
        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
            initial={{ scale: 1 }}
            whileFocus={{ scale: 1.02 }}
          />
        </InputContainer>
        <Button type="submit" whileHover={{ scale: 1.05 }}>Submit</Button>
      </Form>
    </Container>
  );
};

export default ResetPasswordForm;