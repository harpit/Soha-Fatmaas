import React from "react";
import Footer from "./footer";
import Header from "./header";
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />
      <main style={{ maxHeight: '100%', backgroundColor: '#f5f5f5', fontFamily: 'Roboto, sans-serif' }}>
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Soha&Fatmaas App - Shop Now",
  description: "Ecommerce App",
  keywords: "Perfume , Soap , Bakhoor , Ecommerce , Organic Products",
  author: "Soha And Fatmaas"

}

export default Layout;