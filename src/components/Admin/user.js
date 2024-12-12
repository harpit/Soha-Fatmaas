import React from 'react'
import styled from 'styled-components';
import logo from '../layout/img/logo.jpg'; 
import Sidebar from '../layout/sidebar';

const User = () => {
    const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr; /* Sidebar width and content area */
  height: 100vh;
  overflow: hidden; /* Hide overflow to ensure smooth scrolling */
`;

const SidebarContainer = styled.div`
  display: block;
  background-color: #000; /* Sidebar background color */
  position: relative; /* Allows logo positioning within sidebar */
`;

const Logo = styled.img`
  width: 100%; /* Adjust logo size as needed */
  max-width: 200px; /* Restrict maximum width */
  height: auto;
  margin-bottom: 20px; /* Space between logo and menu items */
`;

const ContentContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f4; /* Light background color for content area */
  display: flex;
  justify-content: center; /* Center card horizontally */
  height: 100%; /* Full height of content area */
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 800px; /* Restrict maximum width of card */
  box-sizing: border-box;
`;


  return (
<DashboardContainer>
        <SidebarContainer>
          <Logo src={logo} alt="Logo" width={10} height={10}/>
          <Sidebar />
        </SidebarContainer>
        <ContentContainer>
          <Card>
            <h1>Users</h1>
          </Card>
        </ContentContainer>
      </DashboardContainer>  )
}

export default User