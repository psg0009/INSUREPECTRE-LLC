import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const History = () => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="py-20 min-h-screen bg-gradient-to-b from-[#7b2ff2] via-[#8f5cff] to-[#4f2c8f]">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Your Chat & Quote History</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
        <p className="text-gray-700 mb-4">Welcome, <span className="font-bold text-purple-700">{user?.firstName || 'Student'}</span>!</p>
        <p className="text-gray-500">Your previous AI conversations and insurance quotes will appear here.</p>
        <div className="mt-8 text-gray-400 italic">(History feature coming soon!)</div>
      </div>
    </div>
  );
};

export default History; 