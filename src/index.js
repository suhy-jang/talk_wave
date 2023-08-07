import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WebSocketProvider } from './contexts/WebSocketContext';
import MainHead from './components/utils/MainHead';
import './css/index.css';
import './css/tailwind.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WebSocketProvider>
      <MainHead iconBgColor="#000000" />
      <App />
    </WebSocketProvider>
  </React.StrictMode>
);
