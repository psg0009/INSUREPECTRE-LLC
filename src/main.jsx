import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import SimpleApp from './SimpleApp'

try {
  const root = document.getElementById('root');
  console.log('Root element:', root);
  
  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <SimpleApp />
      </React.StrictMode>
    );
    console.log('React rendered successfully');
  } else {
    document.body.innerHTML = 'Error: Root element not found!';
    console.error('Root element not found');
  }
} catch (error) {
  console.error('Render error:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; color: red;">
      <h2>Error rendering application:</h2>
      <pre>${error?.message || 'Unknown error'}</pre>
      <p>Check browser console for more details.</p>
    </div>
  `;
} 