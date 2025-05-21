import React, { useState } from 'react';

// FAQ Item component with accordion functionality
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-gray-900 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{question}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`mt-2 overflow-hidden transition-all duration-200 max-h-0 ${
          isOpen ? 'max-h-96' : ''
        }`}
      >
        <p className="text-gray-600 pb-4">{answer}</p>
      </div>
    </div>
  );
};

export default function FAQs() {
  const faqData = [
    {
      question: "What insurance options are recommended for international students?",
      answer: "International students typically need health insurance that complies with their visa requirements. Many universities also offer their own health insurance plans. We recommend considering a comprehensive health insurance plan that covers doctor visits, hospitalization, and emergency services. Additionally, renters insurance is advisable if you're living off-campus to protect your belongings."
    },
    {
      question: "Does my student status qualify me for insurance discounts?",
      answer: "Yes! Many insurance providers offer student discounts, particularly for auto insurance (good student discounts) and renters insurance. Some health insurance providers also have special plans designed for students with lower premiums. When using our AI advisor, be sure to mention you're a student to get recommendations that include these discounts."
    },
    {
      question: "How does the InsureSpectre AI advisor work?",
      answer: "Our AI advisor uses a specialized model trained on insurance information specifically for students. When you interact with it, it analyzes your questions and situation to provide personalized recommendations and answers. It can help you understand insurance concepts, compare options, and find the most cost-effective solutions for your specific needs as a student."
    },
    {
      question: "What is the Break Bus service?",
      answer: "Break Bus is our affordable transportation service that helps students travel home during school breaks. We coordinate rides to common destinations from campus, helping students save money on transportation while ensuring reliable and safe travel options during holiday periods."
    },
    {
      question: "How does Student Storage work?",
      answer: "Our Student Storage service provides convenient storage solutions between semesters. We offer pickup from your dorm or apartment, secure storage of your belongings during breaks, and delivery back to your residence when you return. This eliminates the hassle of moving items back and forth between semesters and is particularly useful for international students."
    },
    {
      question: "Are there specific insurance requirements for student visa holders?",
      answer: "Yes, many student visas (such as F1 and J1 visas in the US) have specific health insurance requirements. These typically include minimum coverage amounts for medical benefits, repatriation, and medical evacuation. Your university's international student office can provide specific details, and our AI advisor can help recommend compliant insurance plans."
    },
    {
      question: "What is renters insurance and do I need it as a student?",
      answer: "Renters insurance covers your personal belongings against theft, damage, and sometimes liability if someone is injured in your rented space. As a student living in off-campus housing, renters insurance is highly recommended. It's typically inexpensive (often $10-20 per month) and provides significant protection for your electronics, furniture, and other possessions."
    },
    {
      question: "When will InsureSpectre's full services be available?",
      answer: "We're currently in development and preparing to launch our full suite of services soon. Sign up for our newsletter on the homepage to be notified when we officially launch and receive early access to our platform's features."
    }
  ];

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-center mb-10">Find answers to common questions about our services and student insurance options</p>
        
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-2">
            {faqData.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">Our team is here to help you with any questions you might have about our services.</p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
