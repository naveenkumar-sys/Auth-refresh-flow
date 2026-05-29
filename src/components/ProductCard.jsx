import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 flex flex-col h-full">
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                    src={product?.image || product?.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"} 
                    alt={product?.name || 'Product Image'} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-black text-indigo-600 shadow-sm border border-white/20">
                    ${product?.price || '99.99'}
                </div>
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {product?.name || "Awesome Premium Product"}
                    </h3>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-grow">
                    {product?.description || "This is a brief description of the product. It highlights the main features and benefits to catch the buyer's attention."}
                </p>
                <div className="mt-auto">
                    <button className="w-full py-3 bg-indigo-50 text-indigo-600 font-bold rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
