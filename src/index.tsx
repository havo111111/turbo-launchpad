import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

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

// Initialize window.ethereum if it doesn't exist
if (typeof window.ethereum === 'undefined') {
  window.ethereum = {
    isMetaMask: true,
    isMetaMaskProvider: true,
    request: async (...args: any[]) => {
      if (window.ethereum?.request) {
        return window.ethereum.request(...args);
      }
      throw new Error('MetaMask provider not available');
    },
    on: (...args: any[]) => {
      if (window.ethereum?.on) {
        return window.ethereum.on(...args);
      }
      return () => {};
    },
    removeListener: (...args: any[]) => {
      if (window.ethereum?.removeListener) {
        return window.ethereum.removeListener(...args);
      }
      return () => {};
    },
    enable: async () => {
      if (window.ethereum?.enable) {
        return window.ethereum.enable();
      }
      throw new Error('MetaMask provider not available');
    }
  };
}

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
