import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import InsureSpectreLogo from './components/InsureSpectreLogo';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AIAssistant from './pages/AIAssistant';
import History from './pages/History';

// Enhanced navbar component with authentication
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <InsureSpectreLogo size={48} />
              <span className="text-2xl font-bold text-purple-800">InsureSpectre</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              <Link to="/" className="text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">Home</Link>
              <Link to="/services" className="text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">Services</Link>
              <Link to="/about" className="text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">Contact</Link>
              {isAuthenticated && (
                <>
                  <Link to="/ai-assistant" className="text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">AI Assistant</Link>
                  <Link to="/history" className="text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">History</Link>
                </>
              )}
            </div>
            <div className="flex items-center space-x-4 ml-8">
              {isAuthenticated ? (
                <>
                  <span className="text-purple-700 font-semibold">Hi, {user?.firstName || 'Student'}</span>
                  <button onClick={handleLogout} className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-full font-medium transition duration-300">Log out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">Log in</Link>
                  <Link to="/signup" className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-full font-medium transition duration-300">Sign up</Link>
                  <button className="flex items-center space-x-2 border border-gray-300 hover:border-purple-500 px-4 py-2 rounded-full font-medium transition duration-300">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                    <span>Sign in with Google</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">Home</Link>
              <Link to="/services" className="block text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">Services</Link>
              <Link to="/about" className="block text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">About</Link>
              <Link to="/contact" className="block text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">Contact</Link>
              {isAuthenticated && (
                <>
                  <Link to="/ai-assistant" className="block text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">AI Assistant</Link>
                  <Link to="/history" className="block text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">History</Link>
                </>
              )}
              {isAuthenticated ? (
                <button onClick={handleLogout} className="block w-full text-left bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded-md font-medium mt-2">Log out</button>
              ) : (
                <>
                  <Link to="/login" className="block text-gray-700 hover:text-purple-700 px-3 py-2 rounded-md font-medium">Log in</Link>
                  <Link to="/signup" className="block bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded-md font-medium">Sign up</Link>
                  <button className="flex items-center space-x-2 w-full text-left border border-gray-300 hover:border-purple-500 px-3 py-2 rounded-md font-medium">
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                    <span>Sign in with Google</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Enhanced footer component
const Footer = () => (
  <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 flex flex-col items-start space-y-4">
          <InsureSpectreLogo size={56} />
          <h3 className="text-xl font-bold mb-2 text-purple-400">InsureSpectre</h3>
          <p className="text-gray-300 mb-4 max-w-md">
            Your trusted student insurance advisor, providing personalized guidance for all your insurance needs throughout your academic journey.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.023 10.023 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.473c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
            <li><Link to="/services" className="text-gray-300 hover:text-white">Services</Link></li>
            <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
            <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-gray-300 mb-2">Email: support@insurespectre.com</p>
          <p className="text-gray-300 mb-2">Phone: (555) 123-4567</p>
          <p className="text-gray-300">Hours: Monday - Friday: 9am - 5pm EST</p>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center">
        <p className="text-gray-400">© 2024 InsureSpectre. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ai-assistant" element={<AIAssistant />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

function SimpleApp() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default SimpleApp; 