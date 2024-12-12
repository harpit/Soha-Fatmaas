import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loader from "../spinner";
import axios from "axios";

export default function AdminRouter(){
    const [ok , setok] = useState(false);
    const [auth, setauth] = useAuth();

    useEffect(()=>{
        const authCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/admin-auth`)
            if (res.data.ok) {
                setok(true);
            }else{
                setok(false);
            }
        }
        if (auth?.token) authCheck();
    },[auth?.token]);

    return ok ? <Outlet/> : <Loader path=""/>
}