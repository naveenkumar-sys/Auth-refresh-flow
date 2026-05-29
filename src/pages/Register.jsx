import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff, FiBriefcase } from 'react-icons/fi';
import API from '../api/axios';
import toast from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [visiblity, setVisiblity] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "buyer"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/user/register", formData);
            toast.success("Registration successful! Please login.");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 -mt-16 pt-16 lg:pt-0">
            {/* Left Panel - Branding/Visual (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden items-center justify-center">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-indigo-600 to-purple-700 opacity-90"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute top-1/4 -right-24 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>
                
                <div className="relative z-10 p-12 text-center max-w-xl">
                    <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">Join the Future</h1>
                    <p className="text-xl text-indigo-100 font-light drop-shadow">Create an account to unlock amazing new features and experience a seamless workflow designed just for you.</p>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
                {/* Mobile gradient blob (only visible on small screens) */}
                <div className="lg:hidden absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-indigo-50 to-transparent"></div>
                
                <div className="w-full max-w-md relative z-10">
                    <div className="mb-10">
                        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200 lg:hidden">
                            <span className="text-white font-bold text-xl">W</span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Create Account</h2>
                        <p className="text-gray-500 text-lg">
                            Already have an account?{' '}
                            <button 
                                type="button"
                                onClick={() => navigate("/login")} 
                                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiUser className="text-gray-400 text-lg" />
                                </div>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe" 
                                    required 
                                    className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200" 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400 text-lg" />
                                </div>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com" 
                                    required 
                                    className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200" 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400 text-lg" />
                                </div>
                                <input 
                                    type={visiblity ? "text" : "password"} 
                                    name="password" 
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••" 
                                    required 
                                    minLength="6"
                                    className="block w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200" 
                                />
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-500 hover:text-gray-700" onClick={() => setVisiblity(!visiblity)}>
                                    {visiblity ? <FiEye /> : <FiEyeOff />}
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-1.5">Role</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FiBriefcase className="text-gray-400 text-lg" />
                                </div>
                                <select 
                                    name="role" 
                                    id="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="block w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer" 
                                >
                                    <option value="buyer">Buyer</option>
                                    <option value="seller">Seller</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-500">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-lg shadow-indigo-200 transition-all duration-300 mt-4"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FiArrowRight className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                            </span>
                            Register
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Register;