import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <img 
          src="/images/hero-bg.jpg" 
          alt="Student Life" 
          className="w-full h-[70vh] object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center px-6 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Making Student Life Easy & Affordable
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Find affordable phone plans, health insurance, and banking solutions easily
            </p>
            <p className="text-xl md:text-2xl text-white font-medium mb-8">
              for students, by students!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/ai-advisor" 
                className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Try AI Advisor
              </Link>
              <Link 
                to="/about" 
                className="bg-white hover:bg-gray-100 text-indigo-700 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How We Help Students</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Insurance Guidance</h3>
              <p className="text-gray-600">
                Navigate health, renter's, and auto insurance options with personalized recommendations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Banking Solutions</h3>
              <p className="text-gray-600">
                Find student-friendly bank accounts with no fees, cash back rewards, and international services.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Plans</h3>
              <p className="text-gray-600">
                Compare student discounts on phone plans with data, international calling, and flexible terms.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Quick Links */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/breakbus" className="block group">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-700 transition-colors">Break Bus</h3>
                <p className="text-gray-600">Affordable transportation home during school breaks</p>
              </div>
            </Link>
            
            <Link to="/studentstorage" className="block group">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-700 transition-colors">Student Storage</h3>
                <p className="text-gray-600">Convenient storage solutions for between semesters</p>
              </div>
            </Link>
            
            <Link to="/ai-advisor" className="block group">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-700 transition-colors">AI Advisor</h3>
                <p className="text-gray-600">Get personalized recommendations with our AI assistant</p>
              </div>
            </Link>
            
            <Link to="/faqs" className="block group">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-700 transition-colors">Resources</h3>
                <p className="text-gray-600">Helpful guides and FAQs for students</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Start Saving Today</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who have simplified their lives and saved money with InsureSpectre
          </p>
          <div className="inline-block">
            <button className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-md font-medium transition-colors text-lg">
              Get Started
            </button>
          </div>
          <p className="text-gray-500 mt-4">Coming soon...</p>
        </div>
      </section>
    </div>
  );
}
