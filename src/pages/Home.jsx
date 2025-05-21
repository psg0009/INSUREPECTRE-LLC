import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Placeholder testimonials data
const testimonials = [
  {
    name: 'James Martinez',
    school: 'UCLA',
    quote: 'InsureSpectre made insurance easy and affordable for me as a student!',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Taylor Smith',
    school: 'NYU',
    quote: 'The AI assistant answered all my questions instantly. Highly recommended!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Leila Washington',
    school: 'UMichigan',
    quote: 'I found the perfect health insurance plan for my needs. Thank you InsureSpectre!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

// Placeholder partners
const partners = [
  { name: 'PartnerOne', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' },
  { name: 'PartnerTwo', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg' },
  { name: 'PartnerThree', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg' },
];

const Home = () => {
  // TODO: Replace with real authentication logic
  const [isAuthenticated] = useState(false);
  const [demoMessage, setDemoMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI insurance assistant. How can I help you today?' }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!demoMessage.trim()) return;
    setChatHistory(prev => [...prev, { role: 'user', content: demoMessage }]);
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: 'I understand you\'re interested in student insurance. Let me help you find the best coverage for your needs. Would you like to know more about our health insurance options?'
      }]);
    }, 1000);
    setDemoMessage('');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#7b2ff2] via-[#8f5cff] to-[#4f2c8f]">
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Your AI-Powered Insurance Guide
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Experience the future of insurance guidance with our intelligent AI assistant. Get personalized recommendations and instant answers to all your insurance questions.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/signup" className="bg-white/90 text-purple-700 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-white transition">
                Get Started Free
              </Link>
              <button className="bg-white/20 border border-white/40 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-white/30 transition">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Conditional rendering based on authentication */}
      {isAuthenticated ? (
        // AI Assistant Section
        <section className="py-20 bg-white/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 bg-purple-600 text-white">
                <h3 className="text-xl font-semibold">Live Chat Demo</h3>
              </div>
              <div className="h-96 overflow-y-auto p-6 bg-gray-50">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-4 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white text-gray-800 shadow'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={demoMessage}
                    onChange={(e) => setDemoMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : (
        // Demo Video, Testimonials, Partners
        <>
          {/* Demo Video Section */}
          <section className="py-16 bg-white/80">
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex flex-col items-center">
                <video controls className="rounded-2xl shadow-lg w-full max-w-2xl mb-8">
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="text-lg text-gray-700">See how InsureSpectre can help you!</p>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 bg-white/90">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">What Students Are Saying</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                    <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mb-4 border-4 border-purple-200" />
                    <p className="text-gray-700 italic mb-4">"{t.quote}"</p>
                    <div className="text-purple-700 font-bold">{t.name}</div>
                    <div className="text-gray-500 text-sm">{t.school} Student</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Partners Section */}
          <section className="py-12 bg-white/80">
            <h2 className="text-center text-xl font-bold text-purple-800 mb-6">Our Partners</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {partners.map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                  <img src={p.logo} alt={p.name} className="h-12 mb-2" />
                  <span className="text-gray-600 text-sm">{p.name}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home; 