import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { AuthProvider } from './contexts/AuthContext';
import MainHead from './components/utils/MainHead';
import theme from './config/theme';
import './css/index.css';
import './css/tailwind.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <WebSocketProvider>
        <ThemeProvider theme={theme}>
          <MainHead iconBgColor="#000000" />
          <App />
        </ThemeProvider>
      </WebSocketProvider>
    </AuthProvider>
  </React.StrictMode>
);
