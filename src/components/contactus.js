import React, { useState } from 'react';
import '../css/contactus.css';
import Layout from './layout/layout';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [name ,setName ] = useState();
  const [email ,setEmail ] = useState();
  const [message ,setMessage ] = useState();

  const handlecontactUs = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/contact/contact-us`, {name, email , message});
      if (data?.status) {
        toast.success('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
    }
  }
  return (
      <Layout>
    <div>
      <section className="contact_us">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="contact_inner">
                <div className="row">
                  <div className="col-md-10">
                    <div className="contact_form_inner">
                      <div className="contact_field">
                        <h3>Contact Us</h3>
                        <p>Feel free to contact us any time. We will get back to you as soon as we can!</p>
                        <input type="text" onChange={(e)=>setName(e.target.value)} className="form-control form-group" placeholder="Name" />
                        <input type="text" onChange={(e)=>setEmail(e.target.value)} className="form-control form-group" placeholder="Email" />
                        <textarea className="form-control form-group" onChange={(e)=>setMessage(e.target.value)} placeholder="Message"></textarea>
                        <button className="contact_form_submit" onClick={handlecontactUs}>Send</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="right_contact_social_icon d-flex align-items-end">
                      <div className="social_item_inner d-flex">
                        <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="contact_info_sec">
                  <h4>Contact Info</h4>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-headset"></i>
                    <span>+91 8009 054294</span>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-envelope-open-text"></i>
                    <span>info@flightmantra.com</span>
                  </div>
                  <div className="d-flex info_single align-items-center">
                    <i className="fas fa-map-marked-alt"></i>
                    <span>1000+ Travel partners and 65+ Service cities across India, USA, Canada & UAE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="map_sec">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="map_inner">
                <h4>Find Us on Google Map</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quo beatae quasi assumenda, expedita aliquam minima tenetur maiores neque incidunt repellat aut voluptas hic dolorem sequi ab porro, quia error.</p>
                <div className="map_bind">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471220.5631094339!2d88.04952462217592!3d22.6757520733225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1596988408134!5m2!1sen!2sin"
                    width="100%" height="450" frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
      </Layout>
  );
};

export default ContactUs;
