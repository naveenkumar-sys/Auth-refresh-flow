import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { FiHome, FiLogIn, FiLogOut, FiUserPlus, FiUser } from 'react-icons/fi';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        if(logout) logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
                            A
                        </div>
                        <span className="font-bold text-xl text-gray-900 tracking-tight">
                            Auth<span className="text-indigo-600">App</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium flex items-center gap-2 transition-colors">
                            <FiHome className="text-lg" />
                            <span>Home</span>
                        </Link>
                        
                        {user ? (
                            <div className="flex items-center gap-4 ml-4">
                                <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
                                    <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700">
                                        <FiUser />
                                    </div>
                                    <span className="text-sm font-semibold text-indigo-900">{user.name || user.email || 'User'}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:text-red-600 transition-all shadow-sm active:scale-95 cursor-pointer"
                                >
                                    <FiLogOut />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 ml-4">
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-5 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <FiLogIn />
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:opacity-90 transition-all shadow-md active:scale-95"
                                >
                                    <FiUserPlus />
                                    <span>Register</span>
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-600 hover:text-red-600 cursor-pointer"
                            >
                                <FiLogOut className="text-2xl" />
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <Link to="/login" className="p-2 text-indigo-600">
                                    <FiLogIn className="text-2xl" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;