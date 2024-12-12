import React from 'react';
import '../../css/navbar.css';
import '../../css/style.css';
import { FaBagShopping } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import logo from '../layout/img/logo.jpg';
import { FaCaretDown, FaUser } from 'react-icons/fa';
import SearchInput from '../searchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });

    localStorage.removeItem('auth');
    toast.success("User logged out");
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <nav className="navbar navbar-expand-xl">
      <div className="container">
        <Link to="/">
          <img src={logo} width="100px" height="90px" alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvas"
          aria-controls="navbarOffcanvas"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-start"
          id="navbarOffcanvas"
          tabIndex="-1"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              <Link to="/">
                <img
                  src={logo}
                  width="100px"
                  height="80px"
                  alt="Logo"
                  className="navbar-brand"
                />
              </Link>
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="navbar-nav justify-content-center flex-grow-1 pe-3">
              <Link className="nav-item nav-link" to="/">Home</Link>
              <Link className="nav-item nav-link" to="/contact-us">Feedback</Link>
              <Link className="nav-item nav-link" to="/shop">Shop</Link>
              <div className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/shop"
                  id="categoryDropdown"
                  data-bs-toggle="dropdown"
                >
                  Categories <FaCaretDown/>
                </Link>
                <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                  {categories?.map((category) => (
                    <li key={category._id}>
                      <Link className="dropdown-item d-flex align-items-center" to={`/category/${category.slug}`}>
                        {category.icon && <img src={category.icon} alt={category.name} className="me-2" width="24" height="24" />}
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="navbar-right">
              <div className="cart">
                <Badge count={cart?.length} color='#9d8b54' showZero>
               <NavLink to="/cart"> <FaBagShopping color='#9d8b54' size={19} /></NavLink>
                </Badge>
              </div>
              {!auth.user ? (
                <Link
                  className="btn btn-outline-black me-4"
                  to="/login"
                  style={{ color: "#9d8b54", borderColor: "#9d8b54", marginLeft: "15px" }}
                >
                  <FaUser className="me-2 mt-0" />Account
                </Link>
              ) : (
                <div className="dropdown">
                  <button
                    className="btn btn-outline-black dropdown-toggle d-flex align-items-center"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUser className="me-2" /> {auth?.user?.name}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                      <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
              <SearchInput />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
