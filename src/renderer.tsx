import './styles/global.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';

console.log('🔧 Renderer script starting...');
console.log('🔧 React version:', React.version);

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('❌ Root element not found!');
  document.body.innerHTML = '<h1 style="color: red; padding: 50px;">ERROR: Root element not found!</h1>';
} else {
  console.log('✅ Root element found');
  try {
    const root = createRoot(rootElement);
    console.log('✅ Root created, rendering App...');
    root.render(<App />);
    console.log('✅ App rendered!');
  } catch (error) {
    console.error('❌ Error rendering:', error);
    document.body.innerHTML = `<h1 style="color: red; padding: 50px;">ERROR: ${error}</h1>`;
  }
}

// Test global
window.testReact = () => {
  console.log('React is available:', typeof React !== 'undefined');
  console.log('Root element:', document.getElementById('root'));
};

console.log('🔧 Run window.testReact() to test');