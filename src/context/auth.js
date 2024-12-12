import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    //global default header

    axios.defaults.headers.common['Authorization'] =  auth?.token;
    
    useEffect(()=>{
      const data = localStorage.getItem("auth");
        if(data){
            const dataparse = JSON.parse(data);
            setAuth({
                ...auth,
                user: dataparse.user,
                token: dataparse.token,
            })
        }
      //eslint-disable-next-line 
    },[])
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//custom hooks

const useAuth = () => useContext(AuthContext)

export {useAuth , AuthProvider}