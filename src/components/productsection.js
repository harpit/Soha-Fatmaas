import React, { useEffect, useState } from 'react';
import '../css/productsection.css';
import { useAuth } from '../context/auth';
import Layout from './layout/layout';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Checkbox, Radio } from 'antd';
import { Prices } from './price';
import { IoFilter, IoReload } from 'react-icons/io5';
import { FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cart';

const ProductSection = () => {
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useCart();

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
        if (checked.length > 0 || radio.length > 0) {
            filterProduct();
        } else {
            getAllProduct();
        }
    }, [checked, radio]);

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

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
            if (data.status) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong in getting categories");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    };

    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/product/product-filters`, { checked, radio });
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch filtered products.");
        }
    };

    return (
        <Layout title={"Soha&Fatmaas - Shop"}>
            <div className="product-section" style={{padding:"28px"}}>
                <div className='row'>
                    <div className='col-md-2'>
                        <div className={`filter-container ${isFilterOpen ? 'open' : ''}`}>
                            <h3 className="filter-title">Filter By Category</h3>
                            <div className='d-flex flex-column'>
                                {categories.map((c) => (
                                    <Checkbox key={c._id}
                                        style={{ fontFamily: "Roboto, sans-serif", fontWeight: "bold", fontSize: "14px" }}
                                        onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                        {c.name}
                                    </Checkbox>
                                ))}
                            </div><br />
                            <h3 className="filter-title">Filter By Price</h3>
                            <div className='d-flex flex-column'>
                                <Radio.Group
                                    style={{ fontFamily: "Roboto, sans-serif", fontWeight: "bold", fontSize: "14px" }}
                                    onChange={(e) => setRadio(e.target.value)}>
                                    {Prices.map((p) => (
                                        <div key={p._id}>
                                            <Radio value={p.array}> {p.name}</Radio>
                                        </div>
                                    ))}
                                </Radio.Group>
                            </div><br />
                            <button className="btn btn-outline-dark" onClick={() => window.location.reload()}>
                                <IoReload size={16} /> Reset Filter
                            </button>
                        </div>
                        <div className="filter-button d-md-none" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                            <IoFilter size={20} className={`filter-icon ${isFilterOpen ? 'filter-icon-rotate' : ''}`} />
                            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                        </div>
                    </div>
                    <div className='col-md-10'>
                        <div className="products-container">
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
                    <div className='m-3 p-3 text-center'>
                        {products && products.length < total && (
                            <button className='btn btn-dark load-more-button' onClick={(e) => { e.preventDefault(); setPage(page + 1); }}>
                                {loading ? <FaSpinner className="spinner-icon" /> : "Load More..."}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductSection;
