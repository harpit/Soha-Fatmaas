import React from 'react';
import About from './about.js';
import CategorySection from './category.js';
import ContactForm from './contactus.js';
import CarouselComponent from './headercarosel.js';
import Layout from './layout/layout.js';
import PopularProduct from './popularproduct.js';
import PopularProduct2 from './popularproduct2.js';
import ProductSection from './productsection.js';
import Testimonials from './testimonials.js';
import AboutUs from './about.js';
import { useAuth } from '../context/auth.js';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <Layout title={"Soha&Fatmaas"} author={"Soha&Fatmaas"} description={"Low Rates, Long Lasting Perfume, fragrances"}>
        <div id="\">
          <CarouselComponent />
        </div>
        <div id="popular-products">
          <PopularProduct />
          <PopularProduct2 />
        </div>
        <div id="category">
          <CategorySection />
        </div>
          <AboutUs/>
        {/* <div id="products">
          <ProductSection />
        </div> */}
        <div id="testimonials">
          <Testimonials />
        </div>
        {/* <div id="contact">
          <ContactForm />
        </div> */}
      </Layout>
    </div>
  );
}

export default HomePage;
