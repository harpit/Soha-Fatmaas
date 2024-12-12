import React from 'react';
import Slider from 'react-slick';
import '../css/testimonial.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: 'Esha Fatima',
    image: 'https://media.istockphoto.com/id/2015429231/vector/vector-flat-illustration-in-black-color-avatar-user-profile-person-icon-profile-picture.jpg?s=612x612&w=0&k=20&c=Wu70OARg2npxWy5E22_ZLneabuTafvV_6avgYPhWOoU=',
    text: "I've Ordered 2 Bottles From Soha&Fatmaas And Loved The Fragrances I'm Impressed By Lasting and Quality Notes Which Brings Out The Best Version Of My self and I Feel Super Good After Applying These Fragrances",
  },
  {
    name: 'Jane Smith',
    image: 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    text: 'A game changer for our industry. Highly recommended!',
  },
];

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  return (
    <div className='container'>
    <div className="testimonial-section">
      <h2>What Our Customers Say</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <img src={testimonial.image} alt={testimonial.name} />
            <div className="testimonial-content">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <h3>{testimonial.name}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default Testimonial;
