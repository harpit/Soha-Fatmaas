import React from 'react'
import { useSearch } from '../context/search';
import Layout from '../components/layout/layout.js';
import { Link } from 'react-router-dom';

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout>
            <><div>
                {values.results.length < 1 ? "No results found" : `Found ${values.results.length}`}
            </div><div className='col-md-10'>
                    <div className="products-container">
                        {values?.results.map((product, index) => (
                            <div className="product-card fade-in" key={product._id} style={{ animationDelay: `${index * 0.1}s` }}>
                               <Link to={`/product/${product.slug}`} key={product._id} className="product-card-link" style={{ width: "100%"}}>
                                    <div className="product-image-wrapper">
                                        <img
                                            alt={product.name}
                                            src={`${process.env.REACT_APP_API}/api/product/photo-product/${product._id}`}
                                            width="100%"
                                            height="100%"
                                            style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">{product.name}</h3>
                                        <p className="product-description">{product.description.substring(0, 30)}...</p>
                                        <h6 className="product-price">${product.price}</h6>
                                    </div>
                            </Link>
                                </div>
                        ))}
                    </div>
                </div></>
        </Layout>
    )
}

export default Search