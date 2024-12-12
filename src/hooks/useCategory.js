import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
    const [categories, setCategories] = useState([]);

    const getCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/category/get-category`);
            setCategories(data?.categories); 
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    return categories;
}
