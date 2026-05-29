import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './route/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import SellerRoute from './route/SellerRoute';
import CreateProduct from './pages/CreateProduct';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<ProtectedRoute><SellerRoute><Dashboard /></SellerRoute></ProtectedRoute>} />
        <Route path='/create-product' element={<ProtectedRoute><SellerRoute><CreateProduct /></SellerRoute></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;