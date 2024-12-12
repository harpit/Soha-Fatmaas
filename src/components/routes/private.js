import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Loader from "../spinner";

export default function PrivateRouter(){
    const [ok , setok] = useState(false);
    const [auth, setauth] = useAuth();

    useEffect(()=>{
        const authCheck = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/user-auth`)
            if (res.data.ok) {
                setok(true);
            }else{
                setok(false);
            }
        }
        if (auth?.token) authCheck();
    },[auth?.token]);

    return ok ? <Outlet/> : <Loader/>
}