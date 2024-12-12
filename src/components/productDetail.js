import styled from 'styled-components';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Layout from './layout/layout';
import { useCart } from '../context/cart';
import OwlCarousel from 'react-owl-carousel';
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useCart();

    useEffect(() => {
        if (params?.slug) {
            getProduct();
        }
    }, [params?.slug]);

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/single-product/${params.slug}`);
            setProduct(data?.product || {});
            setSelectedSize(data?.product.bottleSizes?.[0] || null);
            getSimilarProducts(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log('Failed to fetch product:', error);
        }
    };

    const getSimilarProducts = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log('Failed to fetch related products:', error);
        }
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleQuantityChange = (delta) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
    };

    const addToCart = () => {
        const existingProduct = cart.find(
            (item) => item._id === product._id && item.size._id === selectedSize._id
        );

        if (existingProduct) {
            toast.warning('This product is already in the cart.');
            return;
        }

        const newProduct = {
            ...product,
            size: selectedSize,
            quantity,
        };
        setCart([...cart, newProduct]);
        localStorage.setItem('cart', JSON.stringify([...cart, newProduct]));
    };

    const hasBottleSizesWithPrice = product.bottleSizes?.some(size => size.price);

    return (
        <Layout>
            <div className="container">
                <StyledContainer>
                    <Row>
                        <Col md={6}>
                            <motion.div
                                className="item"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <img
                                    alt={product.name || 'Product Image'}
                                    src={`${process.env.REACT_APP_API}/api/product/photo-product/${product._id}`}
                                    width="100%"
                                    height="100%"
                                    style={{ objectFit: 'cover', borderRadius: '10px' }}
                                    className="product-image"
                                />
                            </motion.div>
                        </Col>
                        <Col md={6}>
                            <ProductInfo>
                                <motion.h2
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {product.name}
                                </motion.h2>
                                <ProductPrice>
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        ${selectedSize?.price || product.price}
                                    </motion.span>
                                </ProductPrice>
                                <StockStatus>
                                    {product.quantity > 0 ? (
                                        <InStock>In Stock</InStock>
                                    ) : (
                                        <OutOfStock>Out of Stock</OutOfStock>
                                    )}
                                </StockStatus>
                                {hasBottleSizesWithPrice && (
                                    <Row>
                                        <Col md={12}>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.6 }}
                                            >
                                                <BottleSizeContainer>
                                                    {product.bottleSizes.map((size, index) => (
                                                        <BottleSizeBox
                                                            key={index}
                                                            onClick={() => handleSizeSelect(size)}
                                                            selected={selectedSize?._id === size._id}
                                                        >
                                                            {size.size} - ${size.price}
                                                        </BottleSizeBox>
                                                    ))}
                                                </BottleSizeContainer>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                )}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <ProductDescription>
                                        <span>Description : </span>{product.description}
                                    </ProductDescription>
                                </motion.p>
                                <ProductCount>
                                    <motion.label
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                    >
                                        <label>
                                            Quantity
                                        </label>

                                    </motion.label>
                                    <QuantityForm>
                                        <div className="qtyminus" onClick={() => handleQuantityChange(-1)}>-</div>
                                        <input type="text" name="quantity" value={quantity} className="qty" readOnly />
                                        <div className="qtyplus" onClick={() => handleQuantityChange(1)}>+</div>
                                    </QuantityForm>
                                    <Button className="round-black-btn" onClick={addToCart}>Add to Cart</Button>
                                </ProductCount>
                            </ProductInfo>
                        </Col>
                    </Row>
                    <RelatedProductsSection>
                        <h3>Similar Products</h3>
                        <OwlCarousel className="owl-theme" margin={10} nav>
                            {relatedProducts.map((relatedProduct) => (
                                <div key={relatedProduct._id}>
                                    <img
                                        alt={relatedProduct.name}
                                        src={`${process.env.REACT_APP_API}/api/product/photo-product/${relatedProduct._id}`}
                                        width="100%"
                                        height="200px"
                                        style={{ objectFit: 'cover', borderRadius: '10px' }}
                                    />
                                    <p className='item'>{relatedProduct.name}</p>
                                </div>
                            ))}
                        </OwlCarousel>
                    </RelatedProductsSection>
                </StyledContainer>
            </div>
        </Layout>
    );
};


const BottleSizeBox = styled.div`
  display: inline-block;
  margin-right: 10px;
  padding: 4px 8px;
  border: 1px solid #9d8b54;
  border-radius: 4px;
  color: #9d8b54;
  font-size: 0.9em;
  background-color: #f8f9fa;
  cursor: pointer;
  ${({ selected }) => selected && `
    background-color: #735a1f;
    color: white;
  `}
`;

const BottleSizeContainer = styled.div`
  margin-top: 5px;
`;

const StyledContainer = styled(Container)`
  padding: 40px 0;
  font-family: "Roboto", sans-serif;
`;

const ProductInfo = styled.div`
  h2 {
    font-size: 40px;
    font-weight: bold;
    color: black;
    margin-bottom : 0.1em
  }
  p {
    font-size: 16px;
    line-height: 20px;
    color: black;
  }
`;

const ProductDescription = styled.div`
  margin-top: 10px;
  span {
   font-weight: bold
  }
  `
const ProductPrice = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: #735a1f;
  margin: 0px 0;
  margin-bottom : 0.1em

  span {
    &.line-through {
      text-decoration: line-through;
      margin-left: 10px;
      font-size: 16px;
      color: #a5a5a5;
    }
  }
`;

const ProductCount = styled.div`
  padding-top: 0px;
  label {
    margin-top: -10px;
    display: block;
    font-size: 20px;
    font-weight: bold;
    color: black;
  }
  .round-black-btn {
    border-radius: 4px;
    background: black;
    color: #fff;
    padding: 10px 30px;
    display: inline-block;
    margin-top: 20px;
    border: solid 2px #212529;
    transition: all 0.5s ease-in-out;
    &:hover,
    &:focus {
      background: transparent;
      color: #212529;
      text-decoration: none;
    }
  }
`;

const StockStatus = styled.div`
    margin-top: 5px;
`;

const InStock = styled.span`
    color: green;
    font-weight: bold;
`;

const OutOfStock = styled.span`
    color: red;
    font-weight: bold;
`;
const QuantityForm = styled.div`
  display: flex;
  align-items: center;
  .qtyminus,
  .qtyplus {
    width: 34px;
    height: 34px;
    background: black;
    text-align: center;
    font-size: 19px;
    line-height: 36px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
  .qty {
    width: 60px;
    text-align: center;
    border: none;
    border-left: solid 2px #ddd;
    border-right: solid 2px #ddd;
    background: #f8f8f8;
  }
`;

const RelatedProductsSection = styled.div`
  margin-top: 40px;
  h3 {
    margin-bottom: 20px;
    font-size: 30px;
    color: black;
    font-weight: bold;
  }
  .item {
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
    color: black;
    font-weight: bold;
    
  }
`;

export default ProductDetail;
