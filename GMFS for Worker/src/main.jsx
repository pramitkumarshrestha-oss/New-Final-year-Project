// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';
import { WorkerProvider } from './Contexts/WorkerContext'; // Import the provider

const container = document.getElementById('root');
const root = createRoot(container); // Create root

root.render(
  <React.StrictMode>
    <WorkerProvider>
      <App />
    </WorkerProvider>
  </React.StrictMode>
);
