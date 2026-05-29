import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-2">Profile</h2>
                    <p className="text-gray-600">Welcome, {user?.username}!</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-2">Orders</h2>
                    <p className="text-gray-600">You have 5 orders</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-2">Settings</h2>
                    <p className="text-gray-600">Manage your settings</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;