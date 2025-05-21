import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AIAssistant = () => {
  const { isAuthenticated } = useAuth();
  const [demoMessage, setDemoMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI insurance assistant. How can I help you today?' }
  ]);

  if (!isAuthenticated) return <Navigate to="/login" />;

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
    <div className="py-20 min-h-screen bg-gradient-to-b from-[#7b2ff2] via-[#8f5cff] to-[#4f2c8f]">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">AI Insurance Assistant</h1>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 bg-purple-600 text-white">
          <h3 className="text-xl font-semibold">Live Chat</h3>
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
  );
};

export default AIAssistant; 