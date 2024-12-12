import React, { useState } from 'react';
import { useSearch } from '../context/search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import '../css/searchbar.css';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!values.keyword) {
            toast.error('Keyword is required');
            return;
        }
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/product-search/${values.keyword}`);
            if (data.status) {
                setValues({ ...values, results: data.results });
                navigate('/search');
            } else {
                console.error('Search failed:', data.message);
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
    }

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    }

    return (
        <>
            <FaSearch className="search-icon" onClick={toggleSearch} />
            <form className={`search-form ${showSearch ? 'show' : ''}`} role="search" onSubmit={handleSearch}>
                <input
                    className="search-input"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <button className="search-button" type="submit">Search</button>
            </form>
        </>
    );
}

export default SearchInput;
