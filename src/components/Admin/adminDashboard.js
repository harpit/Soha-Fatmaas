import React from 'react';
import Sidebar from '../layout/sidebar';
import { useAuth } from '../../context/auth';
import styled from 'styled-components';


const DashboardContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
  color: #333;

  h1, h3 {
    margin-bottom: 15px;
  }

  h1 {
    font-size: 2.5em;
    color: #735a1f;
  }

  h3 {
    font-size: 1.2em;
    color: #9d8b54;
  }

  @media (max-width: 768px) {
    margin-left: 100px;
  padding: 20px;

    h1 {
      font-size: 2em;
    }

    h3 {
      font-size: 1em;
    }
  }

  @media (max-width: 480px) {
   margin-left: 70px;
  padding: 20px;
    h1 {
      font-size: 1.5em;
    }

    h3 {
      font-size: 0.9em;
    }
  }
`;

const WelcomeMessage = styled.p`
  font-size: 1.1em;
  color: #6c757d;

  @media (max-width: 768px) {
    font-size: 1em;
  }

  @media (max-width: 480px) {
    font-size: 0.9em;
  }
`;
const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <>
      <Sidebar />
      <DashboardContainer>
        <h1>{auth?.user?.name}</h1>
        <h3>{auth?.user?.email}</h3>
        <h3>{auth?.user?.phone}</h3>
        <h1>Welcome to the Admin Dashboard</h1>
        <WelcomeMessage>
          Here you can manage categories, view services, and contact information.
        </WelcomeMessage>
      </DashboardContainer>
    </>
  );
};

export default AdminDashboard;
