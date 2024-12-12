// Loader.js
import React, { useEffect, useState } from 'react';
import '../css/spinner.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Loader = ({path = "login"}) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0) {
      navigate(`/${path}` , {
        state : location.pathname
      });
    }

    return () => clearInterval(interval);
  }, [count, navigate , location , path]);

  return (
    <div className="loader-container">
      <h1>Loading...</h1>
      <p>Please wait {count} seconds</p>
      <div className="loader">
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
        <div className="loader-dot"></div>
      </div>
    </div>
  );
};

export default Loader;
