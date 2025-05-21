import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/images/insurespectre-logo.png" 
                  alt="InsureSpectre Logo" 
                  className="h-8 w-auto sm:h-10"
                />
                <span className="ml-2 text-xl font-semibold text-indigo-900">InsureSpectre</span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-800 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition-colors">
              About Us
            </Link>
            <Link to="/breakbus" className="text-gray-800 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition-colors">
              Break Bus
            </Link>
            <Link to="/studentstorage" className="text-gray-800 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition-colors">
              Student Storage
            </Link>
            <Link to="/ai-advisor" className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Try AI Advisor
            </Link>
            
            {isAuthenticated && user ? (
              <div className="relative ml-3 flex items-center">
                <div className="flex items-center">
                  <Link 
                    to="/profile" 
                    className="text-gray-800 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition-colors flex items-center"
                  >
                    <span className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2 text-indigo-800 font-semibold">
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </span>
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-800 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/signin" className="text-gray-800 hover:text-indigo-700 px-3 py-2 text-sm font-medium transition-colors">
                  Sign In
                </Link>
                <Link to="/signup" className="text-indigo-700 hover:text-indigo-800 border border-indigo-700 hover:border-indigo-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-700 hover:bg-gray-100 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-800 hover:text-indigo-700 block px-3 py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-800 hover:text-indigo-700 block px-3 py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/breakbus"
            className="text-gray-800 hover:text-indigo-700 block px-3 py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Break Bus
          </Link>
          <Link
            to="/studentstorage"
            className="text-gray-800 hover:text-indigo-700 block px-3 py-2 text-base font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Student Storage
          </Link>
          <Link
            to="/ai-advisor"
            className="bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium my-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Try AI Advisor
          </Link>
          
          {isAuthenticated && user ? (
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex items-center px-3 py-2">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-semibold">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <span className="ml-2 text-gray-800 font-medium">{user.firstName} {user.lastName}</span>
              </div>
              <Link
                to="/profile"
                className="text-gray-800 hover:text-indigo-700 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Your Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-800 hover:text-indigo-700 block w-full text-left px-3 py-2 text-base font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="border-t border-gray-200 pt-2 mt-2">
              <Link
                to="/signin"
                className="text-gray-800 hover:text-indigo-700 block px-3 py-2 text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-indigo-700 hover:text-indigo-800 border border-indigo-700 rounded-md block px-3 py-2 text-base font-medium my-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
