import React, { useEffect, useState } from 'react';
import Layout from './layout/layout';
import { useParams } from 'react-router-dom';
import '../css/productsection.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryWiseProduct = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');

    
    useEffect(() => {
        if (params?.slug) getProductbycategory();
    }, [params?.slug]);

    const getProductbycategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-category/${params.slug}`);
            setProducts(data.products);
            setCategory(data.category.name);  // Assuming the category has a 'name' field
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="product-section">
            <div className="products-container container mt-3">
                            {products.map((product, index) => (
                                <Link to={`/product/${product.slug}`} key={product._id} className="product-card-link" style={{width:"100%"}}>
                                    <div className="product-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                                        <div className="product-content">
                                            <div className="product-image-wrapper">
                                                <img
                                                    alt={product.name}
                                                    src={`${process.env.REACT_APP_API}/api/product/photo-product/${product._id}`}
                                                    width="100%"
                                                    height="100%"
                                                    style={{ objectFit: 'cover' }}
                                                    className="product-image"
                                                />
                                            </div>
                                            <div className="product-info">
                                                <h3 className="product-name">{product.name}</h3>
                                                <p className="product-description">{product.description.substring(0, 30)}...</p>
                                                <h6 className="product-price">${product.price}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
            </div>
        </Layout>
    );
};

export default CategoryWiseProduct;
