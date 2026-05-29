import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider';

const SellerRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
        return <Navigate to="/login" />
    }
    if (user.role !== "seller") {
        return <Navigate to="/" />
    }
    return children;
}

export default SellerRoute