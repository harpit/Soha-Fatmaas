import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card, Col, Row, Button } from 'antd';
import Sidebar from '../layout/sidebar';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const DashboardContainer = styled.div`
  margin-left: 250px;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
  color: #333;

  h1, h3 {
    margin-bottom: 15px;
  }

  h1 {
    font-size: 2.5em;
    color: #735a1f;
  }

  h3 {
    font-size: 1.2em;
    color: #9d8b54;
  }

  @media (max-width: 768px) {
    margin-left: 100px;
    padding: 20px;

    h1 {
      font-size: 2em;
    }

    h3 {
      font-size: 1em;
    }
  }

  @media (max-width: 480px) {
    margin-left: 70px;
    padding: 20px;
    h1 {
      font-size: 1.5em;
    }

    h3 {
      font-size: 0.9em;
    }
  }
`;

const Title = styled.h2`
  color: #735a1f;
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Pacifico', cursive;
  font-size: 36px;

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const ProductCard = styled(Card)`
  margin: 1rem;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .ant-card-body {
    padding: 16px;
  }

  .ant-card-meta-title {
    color: #735a1f;
    font-weight: bold;
  }

  .ant-card-meta-description {
    color: #9d8b54;
  }

  img {
    height: 200px;
    object-fit: cover;
  }
`;

const DeleteButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: #d93f3f;
    color: white;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;

const BottleSizeBox = styled.div`
  display: inline-block;
  margin: 4px;
  padding: 4px 8px;
  border: 1px solid #9d8b54;
  border-radius: 4px;
  color: #9d8b54;
  font-size: 0.9em;
  background-color: #f8f9fa;
`;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllProduct = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-list/${pageNumber}`);
      setLoading(false);
      if (pageNumber === 1) {
        setProducts(data.products);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Failed to fetch products.");
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-count`);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch total products.");
    }
  };

  useEffect(() => {
    getAllProduct();
    getTotal();
  }, []);

  useEffect(() => {
    if (page > 1) loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-list/${page}`);
      setLoading(false);
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    const answer = window.confirm("Are you sure you want to delete this product?");
    if (!answer) return;
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/product/delete-product/${id}`);
      toast.success("Product deleted successfully.");
      getAllProduct();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <DashboardContainer>
      <Sidebar />
      <ToastContainer />
      <Title>Manage Product</Title>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product._id}>
            <ProductCard
              hoverable
              cover={<img alt={product.name} src={`${process.env.REACT_APP_API}/api/product/photo-product/${product._id}`} />}
            >
            <StyledLink to={`/dashboard/admin/product/${product.slug}`}>
                <Card.Meta
                  title={product.name}
                  description={`$${product.price}`}
                />
                <p>{product.description.substring(0, 30)}.....</p>

              {product.bottleSizes && product.bottleSizes.length > 0 && (
                <div>
                  {product.bottleSizes.map((size, index) => (
                    <BottleSizeBox key={index}>{size.size} - ${size.price}</BottleSizeBox>
                  ))}
                </div>
              )}
              </StyledLink>
              <DeleteButton onClick={() => handleDelete(product._id)}>Delete</DeleteButton>
            </ProductCard>
          </Col>
        ))}
        <div className='m-3 p-3 text-center'>
          {products && products.length < total && (
            <button className='btn btn-dark load-more-button' onClick={(e) => { e.preventDefault(); setPage(page + 1); }}>
              {loading ? <FaSpinner className="spinner-icon" /> : "Load More..."}
            </button>
          )}
        </div>
      </Row>
    </DashboardContainer>
  );
};

export default Product;
