import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <p className="text-xl mb-8">
          InsureSpectre provides comprehensive insurance advice and solutions tailored for students.
        </p>
        
        <div className="grid gap-8 mb-12">
          <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Health Insurance</h2>
            <p className="mb-4">
              Navigate the complex world of student health insurance plans. We help you understand 
              coverage options, including university-provided plans and alternatives that may 
              better suit your needs and budget.
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Compare student health plans</li>
              <li>Understand coverage details</li>
              <li>Find affordable options</li>
            </ul>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Renters Insurance</h2>
            <p className="mb-4">
              Protect your belongings in your dorm or student apartment with affordable renters 
              insurance tailored for students. Coverage for electronics, furniture, and more.
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Affordable coverage options</li>
              <li>Protection for electronics and valuables</li>
              <li>Liability coverage</li>
            </ul>
          </div>
          
          <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">Auto Insurance</h2>
            <p className="mb-4">
              Special rates and coverage options for student drivers. Learn about discounts for 
              good grades and options for part-time student drivers.
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>Student discount programs</li>
              <li>Coverage for part-time drivers</li>
              <li>International student options</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/contact" className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full text-lg font-bold">
            Get Insurance Advice
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services; 