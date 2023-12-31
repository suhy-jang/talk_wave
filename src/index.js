import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChannelProvider } from './contexts/ChannelContext';
import theme from './config/theme';
import './css/index.css';
import './css/tailwind.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <WebSocketProvider>
        <ThemeProvider theme={theme}>
          <ChannelProvider>
            <App />
          </ChannelProvider>
        </ThemeProvider>
      </WebSocketProvider>
    </AuthProvider>
  </React.StrictMode>
);
