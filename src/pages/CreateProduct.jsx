import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { FiBox, FiDollarSign, FiImage, FiFileText, FiPlus } from 'react-icons/fi';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image: "",
        category: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const productData = {
                ...formData,
                price: Number(formData.price)
            };

            const response = await API.post("/product/createProducts", productData);
            toast.success("Product created successfully!");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-indigo-600 px-8 py-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-indigo-900 opacity-20 rounded-full blur-2xl"></div>
                        <h2 className="relative z-10 text-3xl font-extrabold text-white mb-2">Create New Product</h2>
                        <p className="relative z-10 text-indigo-100">Add a new item to your inventory and start selling.</p>
                    </div>

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">Product Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiBox className="text-gray-400 text-lg" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Premium Wireless Headphones"
                                        required
                                        className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1.5">Price ($)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiDollarSign className="text-gray-400 text-lg" />
                                    </div>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        name="price"
                                        id="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="99.99"
                                        required
                                        className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1.5">Image URL</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FiImage className="text-gray-400 text-lg" />
                                    </div>
                                    <input
                                        type="url"
                                        name="image"
                                        id="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://example.com/image.jpg"
                                        required
                                        className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                                <div className="relative">
                                    <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                                        <FiFileText className="text-gray-400 text-lg" />
                                    </div>
                                    <textarea
                                        name="description"
                                        id="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Detailed description of your product..."
                                        required
                                        className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200 resize-none"
                                    ></textarea>
                                </div>
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                                    <div className="relative">
                                        <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                                            <FiFileText className="text-gray-400 text-lg" />
                                        </div>
                                       <select name="category" id="category" value={formData.category} onChange={handleChange} className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-200">
                                        <option value="">Select Category</option>
                                        <option value="electronics">Electronics</option>
                                        <option value="books">Books</option>
                                        <option value="clothing">Clothing</option>
                                        <option value="home">Home</option>
                                      </select>
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex items-center justify-center px-6 py-3 border border-transparent text-white font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-lg shadow-indigo-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <FiPlus className="mr-2 -ml-1 text-lg" />
                                                Create Product
                                            </>
                                        )}
                                    </button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
