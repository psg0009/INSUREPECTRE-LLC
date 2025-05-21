const axios = require('axios');
const readline = require('readline');

// Create interface for reading from console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Make sure we're connecting to the right port (where the backend is running)
const API_URL = 'http://localhost:3001/api';
let authToken = '';
let conversationState = null;

// Function to ask a question and return a promise for the answer
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Check if the backend server is running
async function checkServerConnection() {
  try {
    console.log('Checking connection to backend server...');
    const response = await axios.get(`${API_URL}/health`);
    if (response.status === 200) {
      console.log('Successfully connected to backend server!\n');
      return true;
    }
  } catch (error) {
    console.error('\n⚠️ ERROR: Cannot connect to the backend server');
    console.error('Make sure the backend server is running with:');
    console.error('   cd backend && npm run dev');
    console.error(`Attempted to connect to: ${API_URL}\n`);
    return false;
  }
}

// Login function to get auth token
async function login() {
  try {
    console.log('Logging in...');
    // Using a simpler approach for testing
    const response = await axios.post(`${API_URL}/auth/direct-login`, {
      email: 'test@example.com',
      password: 'password123'  // Using password method instead of uid
    });
    
    if (response.data && response.data.token) {
      authToken = response.data.token;
      console.log('Login successful!');
      return true;
    } else {
      console.error('Login failed: No token received');
      console.log('Using fallback test token...');
      authToken = 'test-token-123';  // Use hardcoded test token
      return true;
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    if (error.response) {
      console.error('Status code:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received from server. Check if server is running on port 3000');
    } else {
      console.error('Error setting up request:', error.message);
    }
    
    // Use fallback test token if login fails
    console.log('Using fallback test token...');
    authToken = 'test-token-123';
    return true;
  }
}

// Function to send message to the student chat API
async function sendMessage(message, useFinetunedModel = true) {
  try {
    // Only log user messages, not internal API calls
    if (message !== 'Hello') {
      console.log(`Sending message: "${message}"`);
    }
    
    const response = await axios.post(
      `${API_URL}/ai/student-chat`, 
      {
        message,
        conversationState,
        useFinetunedModel
      },
      {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    
    // Update conversation state
    conversationState = response.data.data.conversationState;
    
    // Debug: Log conversation state
    console.log('\n[DEBUG] Conversation State:', JSON.stringify({
      stage: conversationState.stage,
      started: conversationState.started,
      questionIndex: conversationState.questionIndex,
      completed: conversationState.completed
    }, null, 2));
    
    // Return the AI response
    return response.data.data.message;
  } catch (error) {
    console.error('\n⚠️ Error sending message:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Server response:', error.response.data);
    } else if (error.request) {
      console.error('No response from server. Is the backend running on port 3000?');
    } else {
      console.error('Error setting up request:', error.message);
    }
    return 'Sorry, an error occurred. Make sure the backend server is running on port 3000.';
  }
}

// Main chat loop
async function startChat() {
  console.log('\n--- Student Insurance Advisor Chat ---\n');
  
  // Check if server is running
  const serverRunning = await checkServerConnection();
  if (!serverRunning) {
    console.log('Cannot connect to the backend server. Exiting...');
    rl.close();
    return;
  }
  
  // First get auth token
  const loggedIn = await login();
  if (!loggedIn) {
    console.log('Cannot continue without logging in. Exiting...');
    rl.close();
    return;
  }
  
  console.log('This chat helps you find the right insurance for your needs as a student.');
  console.log('You can ask questions about different insurance options at any time.\n');
  
  // Get model preference without technical details
  const modelChoice = await askQuestion('Would you like to use our specialized insurance advisor model? (yes/no): ');
  const useFinetunedModel = modelChoice.toLowerCase().includes('yes');
  
  console.log('\nStarting chat with an insurance specialist...\n');
  
  // Initial message to start the conversation
  let aiResponse = await sendMessage('Hello', useFinetunedModel);
  console.log(`Advisor: ${aiResponse}`);
  
  // Chat loop
  let chatActive = true;
  while (chatActive) {
    const userMessage = await askQuestion('You: ');
    
    // Check for exit command
    if (userMessage.toLowerCase() === 'exit' || userMessage.toLowerCase() === 'quit') {
      chatActive = false;
      console.log('Ending chat session. Goodbye!');
      break;
    }
    
    // Send the exact message the user typed without any modifications
    const messageToSend = userMessage;
    
    // Send message to API
    aiResponse = await sendMessage(messageToSend, useFinetunedModel);
    console.log(`Advisor: ${aiResponse}`);
    
    // Check if conversation is completed
    if (conversationState && conversationState.completed) {
      console.log('\nChat completed! You can ask more questions or type "exit" to end.');
    }
  }
  
  rl.close();
}

// Start the chat
startChat().catch(error => {
  console.error('Fatal error:', error);
  rl.close();
}); 