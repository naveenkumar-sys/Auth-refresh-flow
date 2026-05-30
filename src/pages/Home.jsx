import React, { useContext, useEffect, useState } from 'react';
import API from '../api/axios';
import ProductCard from '../components/ProductCard';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        apicall()
    }, [])

    const apicall = async () => {
        try {
            setLoading(true);
            const response = await API.get("/product/getAllProducts");
            // console.log(await response.data.findProducts);

            // Depending on how your backend sends the data, it might be an array directly or inside an object
            // const data = response.data;
            setProducts(await response.data.findProducts);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16 mt-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight mb-4">
                        Discover Our Products
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
                        Explore our latest collection of premium items designed to elevate your everyday experience.
                    </p>
                    {
                        user && user.role === "seller" && <button className=' m-5 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md' onClick={() => navigate("/create-product")}>Create Product</button>
                    }

                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Available</h3>
                        <p className="text-lg text-gray-500">Check back later for new arrivals.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product, index) => (
                            <ProductCard key={product._id || product.id || index} product={product} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Home;