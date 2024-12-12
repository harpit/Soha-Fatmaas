import React from 'react';
import Layout from './layout/layout';

const NotFoundPage = () => {
  return (
    <Layout title={"404-Page not found"} author={"Soha&Fatmaas"}>
    <div style={{ textAlign: 'center', padding: '50px' , marginTop:'100px'}}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <a href="/">Go back to Home</a>
    </div>
    </Layout>
  );
}

export default NotFoundPage;
