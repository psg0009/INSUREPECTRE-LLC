// Enhanced AI Insurance Chatbot Service
// This file contains the API for interacting with the AI chatbot

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Type definitions
export type ChatMessage = {
  message: string;
  isUser: boolean;
};

export type ConversationContext = {
  studentName?: string;
  university?: string;
  graduationYear?: string;
  userPreferences?: {
    needsHealthInsurance?: boolean;
    needsRentersInsurance?: boolean;
    needsAutoInsurance?: boolean;
    needsStudentDiscounts?: boolean;
  };
  previousTopics?: string[];
};

// Get simple insurance advice (no context)
export const getInsuranceAdvice = async (message: string): Promise<string> => {
  try {
    // Check if we're in development mode without a backend
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK_API === 'true') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple mock responses for demonstration
      if (message.toLowerCase().includes('health insurance')) {
        return "Most universities offer student health insurance plans that provide comprehensive coverage at reasonable rates. These plans are designed specifically for students and often include access to on-campus health services. As an alternative, if you're under 26, you might be eligible to remain on your parents' health insurance plan.";
      } else if (message.toLowerCase().includes('renters insurance')) {
        return "Renters insurance is highly recommended for students living off-campus. It typically costs between $10-20 per month and protects your belongings against theft, fire, and other damages. Many policies also include liability coverage in case someone is injured in your apartment.";
      } else if (message.toLowerCase().includes('auto insurance')) {
        return "Many insurance companies offer student discounts for maintaining good grades (often a B average or higher). Look for companies that offer student-specific discounts, and consider whether you need full coverage or liability only, depending on your car's value and how often you drive.";
      } else {
        return "As a student, you have several insurance options to consider. I can provide specific advice on health insurance, renters insurance, or auto insurance. What type of insurance information are you looking for?";
      }
    }
    
    // Real API implementation
    const response = await fetch(`${API_URL}/chat/insurance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get insurance advice');
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Insurance advice error:', error);
    throw error;
  }
};

// Get context-aware insurance advice
export const getContextAwareAdvice = async (
  message: string, 
  context: ConversationContext,
  conversation: ChatMessage[]
): Promise<string> => {
  try {
    // Check if we're in development mode without a backend
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK_API === 'true') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Extract username for personalization if available
      const userName = context.studentName || 'there';
      
      // Personalized context-aware responses
      if (message.toLowerCase().includes('health insurance')) {
        if (context.university) {
          return `Hi ${userName}, as a student at ${context.university}, you should check if they offer a student health insurance plan. These plans are often comprehensive and well-priced for students. I'd recommend visiting your university's student health services website for specific details about their plans.`;
        } else {
          return `Hi ${userName}, most universities offer student health insurance plans that provide comprehensive coverage at reasonable rates. These plans are designed specifically for students and often include access to on-campus health services. Would you like me to explain more about typical coverage options?`;
        }
      } else if (message.toLowerCase().includes('renters insurance') || message.toLowerCase().includes('apartment')) {
        if (context.userPreferences?.needsRentersInsurance) {
          return `Hi ${userName}, since you've indicated interest in renters insurance, I'd recommend looking at policies from companies like Lemonade, State Farm, or Allstate that offer student-specific plans. Typically costing $10-20 monthly, you'll want coverage for your electronics, furniture, and other valuables. Most landlords near universities are familiar with these providers.`;
        } else {
          return `Hi ${userName}, renters insurance is highly recommended for students living off-campus. It typically costs between $10-20 per month and protects your belongings against theft, fire, and other damages. Many policies also include liability coverage in case someone is injured in your apartment.`;
        }
      } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        if (context.studentName) {
          return `Hello again, ${context.studentName}! How can I help you with your insurance questions today?`;
        } else {
          return "Hello! I'm your AI insurance advisor specializing in student insurance needs. I can help with health insurance, renters insurance, auto insurance, and finding student discounts. What would you like to know about?";
        }
      } else if (message.toLowerCase().includes('compare') || message.toLowerCase().includes('which is better')) {
        return `Great question, ${userName}. When comparing insurance options as a student, you should consider: 1) Coverage limits - what's actually covered, 2) Cost - monthly premiums and deductibles, 3) Network restrictions for health insurance, and 4) Special student discounts or benefits. Would you like me to compare specific insurance types for you?`;
      } else {
        // Check conversation history for context
        const hasDiscussedHealth = conversation.some(msg => 
          msg.message.toLowerCase().includes('health insurance'));
        
        const hasDiscussedRenters = conversation.some(msg => 
          msg.message.toLowerCase().includes('renters insurance'));
          
        if (hasDiscussedHealth && message.toLowerCase().includes('cost')) {
          return `Based on our previous discussion about health insurance, ${userName}, student health plans typically cost between $1,500-$2,500 per academic year. This is often cheaper than individual marketplace plans and can be included in your financial aid package at many schools.`;
        } else if (hasDiscussedRenters && message.toLowerCase().includes('need')) {
          return `Following up on our renters insurance conversation: as a student, you should definitely get renters insurance if you live off-campus and have valuable items like a laptop, smartphone, or bicycle. Even a shared apartment should have individual policies for each roommate to cover their personal belongings.`;
        } else {
          return `Hi ${userName}, I'm here to help with any insurance questions you have as a student. I can provide information about health insurance, renters insurance, auto insurance, or general insurance concepts. What specific information are you looking for today?`;
        }
      }
    }
    
    // Real API implementation
    const response = await fetch(`${API_URL}/chat/enhanced`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message, 
        context,
        conversation: conversation.slice(-5) // Send last 5 messages for context
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to get enhanced insurance advice');
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Enhanced advice error:', error);
    throw error;
  }
}; 