import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '../context/AuthProvider';

const Login = () => {
    const navigate = useNavigate();
    const {login}=useContext(AuthContext);
    const [visiblity, setVisiblity] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        await login(formData,setFormData);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Left Panel - Branding/Visual (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden items-center justify-center">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-indigo-600 to-purple-700 opacity-90"></div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute top-1/4 -right-24 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '4s' }}></div>
                
                <div className="relative z-10 p-12 text-center max-w-xl">
                    <h1 className="text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">Welcome to the Future</h1>
                    <p className="text-xl text-indigo-100 font-light drop-shadow">Sign in to discover amazing new features and experience a seamless workflow designed just for you.</p>
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
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Sign in</h2>
                        <p className="text-gray-500 text-lg">
                            Don't have an account?{' '}
                            <button 
                                type="button"
                                onClick={() => navigate("/register")} 
                                className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
                            >
                                Get started today
                            </button>
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                                    className="block w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200" 
                                />
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-500 hover:text-gray-700" onClick={() => setVisiblity(!visiblity)}>
                                    {visiblity ? <FiEye /> : <FiEyeOff />}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer" />
                                <label htmlFor="remember-me" className="ml-2.5 block text-sm text-gray-700 cursor-pointer">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-lg shadow-indigo-200 transition-all duration-300 mt-4"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FiArrowRight className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                            </span>
                            Sign in
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;