import React, { createContext, useEffect, useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    //only storing the user with these we check if the user is logged in or not   by access token and new token with checking the user is available or not in local storage 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    //login function with axios call and get the token from the response and store it in local storage   
    const login = async (formData) => {
        try {
            const response = await API.post("/user/login", formData);
            console.log(response.data);
            setUser(response.data.user);
            localStorage.setItem("token", response.data.accessToken);
            // localStorage.setItem("user", JSON.stringify(response.data.user));
            toast.success("Login successful");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const restoreUser = async () => {
            try {
                setLoading(true);
                const resposne =await API.post("/user/refresh");
                // console.log(resposne.data);
                localStorage.setItem("token", resposne.data.accessToken);
                localStorage.setItem("user", JSON.stringify(resposne.data.user));
                setUser(resposne.data.user);
                toast.success("Session restored");
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        }
        restoreUser();
        setLoading(false);
    }, [])
        //   console.log(user);

    const logout = async () => {
        try {
            await API.post("/user/logout");
        } catch (error) {
            console.log(error);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
            toast.success("Logged out successfully");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;