import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/homepage.js';
import NotFoundPage from './components/notfoundpage.js';
import RegisterForm from './components/Auth/Register.js';
import LoginForm from './components/Auth/Login.js';
import Dashboard from '../src/components/user/dashboard.js';
import PrivateRouter from './components/routes/private.js';
import ForgotPasswordForm from './components/Auth/ForgotPasswordForm.js';
import ResetPasswordForm from './components/Auth/ResetPasswordForm.js';
import AdminRouter from './components/routes/adminroute.js';
import AdminDashboard from './components/Admin/adminDashboard.js';
import CreateCategory from './components/Admin/createCategory.js';
import CreateProduct from './components/Admin/createProduct.js';
import User from './components/Admin/user.js';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Product from './components/Admin/product.js';
import UpdateProduct from './components/Admin/updateProduct.js';
import ProductSection from './components/productsection.js';
import Search from './components/search.js';
import ProductDetail from './components/productDetail.js';
import CategoryWiseProduct from './components/categorywiseproduct.js';
import Cart from './components/cart.js';
import ContactUs from './components/contactus.js';

function App() {
  <ToastContainer/>
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/register",
      element: <RegisterForm />
    },
    {
      path: "/login",
      element: <LoginForm />
    },
    {
      path: "/shop",
      element: <ProductSection/>
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordForm />
    },
    {
      path: "/reset/:token",
      element: <ResetPasswordForm />
    },
    {
      path: "/search",
      element: <Search />
    },
    {
      path: "/product/:slug",
      element: <ProductDetail />
    },
    {
      path: "/category/:slug",
      element: <CategoryWiseProduct />
    },
    {
      path: "/cart",
      element: <Cart />
    },
    {
      path: "/contact-us",
      element: <ContactUs />
    },
    {
      path: "/dashboard",
      element: <PrivateRouter />,
      children: [
        {
          path: "user",
          element: <Dashboard />
        }
      ]
    },
    {
      path: "/dashboard",
      element: <AdminRouter />,
      children: [
        {
          path: "admin",
          element: <AdminDashboard />
        },
        {
          path: "admin/create-category",
          element: <CreateCategory />
        },
        {
          path: "admin/create-product",
          element: <CreateProduct />
        },
        {
          path: "admin/products",
          element: <Product />
        },
        {
          path: "admin/product/:slug",
          element: <UpdateProduct />
        },
        {
          path: "admin/user",
          element: <User />
        },
      ]
    },
    {
      path: "*",
      element: <NotFoundPage />
    }
  ])
  return (
   <RouterProvider router={router}/>
  );
}

export default App;
