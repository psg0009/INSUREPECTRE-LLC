import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About InsureSpectre</h1>
        
        <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            At InsureSpectre, we're dedicated to helping students navigate the complex world of insurance. 
            Our mission is to provide clear, affordable insurance solutions tailored specifically to students' needs.
          </p>
          <p>
            We understand that as a student, you have unique circumstances and financial considerations. 
            That's why we've built a platform that simplifies insurance decision-making and provides 
            personalized guidance when you need it most.
          </p>
        </div>
        
        <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="mb-4">
            Our team consists of insurance experts and former students who understand the unique 
            challenges faced by today's college and university students.
          </p>
          <p>
            We combine industry expertise with technological innovation to deliver an insurance 
            experience that's accessible, transparent, and tailored to the student lifestyle.
          </p>
        </div>
        
        <div className="text-center">
          <Link to="/contact" className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full text-lg font-bold">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About; 