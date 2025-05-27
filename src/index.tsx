import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Handle Metamask injection
if (typeof window.ethereum !== 'undefined') {
  // Prevent Metamask from injecting its provider multiple times
  // eslint-disable-next-line no-self-assign
  window.ethereum = window.ethereum;
}

// Add script to load Metamask if not already present
if (!document.getElementById('metamask-script')) {
  const script = document.createElement('script');
  script.id = 'metamask-script';
  script.src = 'https://cdn.jsdelivr.net/npm/@metamask/inpage-provider/dist/metamask-inpage-provider.min.js';
  script.async = true;
  script.onload = () => {
    // Ensure ethereum is available
    if (typeof window.ethereum === 'undefined') {
      console.warn('Metamask provider not loaded');
    }
  };
  document.head.appendChild(script);
}

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
