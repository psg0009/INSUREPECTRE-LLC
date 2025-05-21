import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.firstName || 'User'}!</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Your dashboard for InsureSpectre</p>
          </div>
          
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.firstName} {user?.lastName}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.email}
                </dd>
              </div>
              {user?.university && (
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">University</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.university}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              <a 
                href="/ai-advisor" 
                className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-center transition"
              >
                <div className="text-purple-600 text-xl mb-2">🤖</div>
                <h3 className="font-medium">AI Insurance Advisor</h3>
                <p className="text-sm text-gray-500 mt-1">Get personalized insurance recommendations</p>
              </a>
              
              <a 
                href="/studentstorage" 
                className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-center transition"
              >
                <div className="text-blue-600 text-xl mb-2">📦</div>
                <h3 className="font-medium">Student Storage</h3>
                <p className="text-sm text-gray-500 mt-1">Manage your storage solutions</p>
              </a>
              
              <a 
                href="/profile" 
                className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-center transition"
              >
                <div className="text-green-600 text-xl mb-2">👤</div>
                <h3 className="font-medium">Update Profile</h3>
                <p className="text-sm text-gray-500 mt-1">Manage your account information</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 