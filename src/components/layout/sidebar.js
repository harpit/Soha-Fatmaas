import React from 'react';
import '../../css/sidebar.css';
import { FaBars, FaCartPlus, FaHome, FaList, FaProductHunt, FaUser, } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FaShop } from 'react-icons/fa6';

function Sidebar() {
  const toggleNav = () => {
    const sidebar = document.getElementById("mySidebar");
    sidebar.classList.toggle("closed");
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle("open");
    }
  };

  return (
    <div id="mySidebar" className="sidebar">
      <div className="sidebar-header">
        <h3>Menu</h3>
        <button className="toggle-btn" onClick={toggleNav}>
          <FaBars />
        </button>
      </div>
      <Link to="/"><FaHome /> <span>Home</span></Link>
      <Link to="/dashboard/admin/create-category"> <FaList/><span>Category</span></Link>
      <Link to="/dashboard/admin/create-product"> <FaShop/> <span>Create Product</span></Link>
      <Link to="/dashboard/admin/products"> <FaCartPlus/> <span>View Products</span></Link>
      <Link to="/dashboard/admin/user"><FaUser /> <span>Users</span></Link>
    </div>
  );
}

export default Sidebar;
