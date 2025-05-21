import React, { useState, useRef, useEffect } from "react";
import { getInsuranceAdvice, getContextAwareAdvice, ChatMessage } from "../api/insuranceBot";
import { useAuth } from "../contexts/AuthContext";

const ChatMessageBubble = ({ message, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
    <div
      className={`
        max-w-3/4 px-4 py-2 rounded-lg
        ${isUser 
          ? 'bg-indigo-600 text-white rounded-br-none' 
          : 'bg-gray-100 text-gray-800 rounded-bl-none'
        }
      `}
    >
      {message}
    </div>
  </div>
);

export default function AIAdvisor() {
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([
    { 
      message: "Hello! I'm your student insurance advisor. I can help you find the right insurance options and answer any questions you might have. How can I help you today?", 
      isUser: false 
    }
  ]);
  
  const { isAuthenticated, user } = useAuth();
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message to conversation
    const userMessage = inputMessage;
    const updatedConversation = [...conversation, { message: userMessage, isUser: true }];
    setConversation(updatedConversation);
    setInputMessage("");
    setLoading(true);
    
    try {
      let botAnswer;
      
      // Use context-aware advice if user is authenticated
      if (isAuthenticated && user) {
        const context = {
          studentName: user.firstName,
          university: user.university,
          graduationYear: user.graduationYear,
          userPreferences: user.preferences
        };
        
        botAnswer = await getContextAwareAdvice(
          userMessage, 
          context, 
          updatedConversation
        );
      } else {
        // Fall back to basic advice if user is not authenticated
        botAnswer = await getInsuranceAdvice(userMessage);
      }
      
      // Add bot response to conversation
      setConversation(prev => [...prev, { message: botAnswer, isUser: false }]);
    } catch (error) {
      console.error("Error getting advice:", error);
      setConversation(prev => [
        ...prev, 
        { 
          message: "Sorry, I'm having trouble connecting right now. Please try again later.", 
          isUser: false 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-10 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">AI Insurance Advisor</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized insurance recommendations and answers to all your insurance questions as a student.
          </p>
          {!isAuthenticated && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg inline-block">
              <p className="text-sm text-indigo-800">
                <span className="font-medium">Pro tip:</span> Sign in to get personalized recommendations based on your profile and preferences.
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-indigo-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold">InsureSpectre AI</h2>
                <p className="text-xs opacity-75">Online • Specialized in student insurance</p>
              </div>
            </div>
            {isAuthenticated && user && (
              <div className="text-xs text-indigo-100 bg-indigo-600 px-2 py-1 rounded">
                Personalized for {user.firstName}
              </div>
            )}
          </div>
          
          {/* Chat Messages Container */}
          <div className="p-4 h-96 overflow-y-auto bg-gray-50">
            {conversation.map((msg, index) => (
              <ChatMessageBubble 
                key={index}
                message={msg.message}
                isUser={msg.isUser}
              />
            ))}
            {loading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none flex items-center">
                  <span className="animate-pulse mr-2">•••</span>
                  <span className="text-xs text-gray-500">AI is thinking</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about student insurance options..."
              className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-r-md transition-colors flex items-center"
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </form>
        </div>
        
        {/* Help Info */}
        <div className="mt-8 bg-indigo-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-indigo-900 mb-3">What You Can Ask About:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-indigo-800 mb-2">Insurance Types</h4>
              <ul className="text-gray-700 space-y-1 ml-4">
                <li>• Health insurance options for students</li>
                <li>• Renters insurance coverage</li>
                <li>• Car insurance student discounts</li>
                <li>• Travel insurance for study abroad</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-indigo-800 mb-2">Insurance Concepts</h4>
              <ul className="text-gray-700 space-y-1 ml-4">
                <li>• How deductibles work</li>
                <li>• Understanding premiums vs. copays</li>
                <li>• International student insurance requirements</li>
                <li>• Coverage limitations and exclusions</li>
              </ul>
            </div>
          </div>
          
          {isAuthenticated ? (
            <div className="mt-4 p-3 bg-green-100 rounded text-sm text-green-800">
              <span className="font-medium">✓ Using personalized mode:</span> Your advisor can tailor recommendations based on your profile information.
            </div>
          ) : (
            <div className="mt-4 p-3 bg-indigo-100 rounded text-sm text-indigo-800">
              <span className="font-medium">Want personalized advice?</span> <a href="/signin" className="underline">Sign in</a> or <a href="/signup" className="underline">create an account</a> to get recommendations tailored to your specific situation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 