import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSocket } from '../contexts/WebSocketContext';
import useReconnectSocket from '../hooks/useReconnectSocket';
import Snackbar from '@mui/material/Snackbar';
import Alert from './AlertWrapper';

function ChatComponent({ className }) {
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);

  const typingTimeoutRef = useRef(null);

  const rawSocket = useSocket();
  const socket = useReconnectSocket(rawSocket);

  const errorHandling = useCallback((message) => {
    console.error('WebSocket Error: ', message);
    // handleShowError('A problem occurred with the connection.');
    setError('A problem occurred with the connection.');
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onerror = errorHandling;

      socket.on('error', errorHandling);

      socket.on('userJoined', (message) => {
        setChatHistory((prev) => [...prev, message]);
      });

      socket.on('userLeft', (message) => {
        setChatHistory((prev) => [...prev, message]);
      });

      socket.on('userTyping', () => {
        // console.log('start typing');
        setTyping(true);
      });

      socket.on('userStoppedTyping', () => {
        // console.log('stop typing');
        setTyping(false);
      });

      socket.on('receiveMessage', (incomingMessage) => {
        // console.log(`received message: ${incomingMessage}`);
        setChatHistory((prev) => [...prev, incomingMessage]);
      });

      return () => {
        socket.off('userJoined');
        socket.off('userLeft');
        socket.off('userTyping');
        socket.off('userStoppedTyping');
        socket.off('receiveMessage');
      };
    }
  }, [socket, errorHandling]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('stopTyping');
      socket.emit('sendMessage', message, (response) => {
        if (response.error) {
          // handleShowError(response.error);

          setError(response.error);
        }
      });
      // console.log(`message sent ${message}`);
      setMessage('');
    } else {
      console.log('no socket provided');
      // handleShowError('Unable to send the message. Connection is missing.');
      setError('Unable to send the message. Connection is missing.');
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    if (socket) {
      clearTimeout(typingTimeoutRef.current);
      socket.emit('typing');

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stopTyping');
      }, 2000);
    } else {
      console.log('no socket in the handleInputChange function');
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  return (
    <div className={className}>
      <div>
        {chatHistory.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input value={message} onChange={handleInputChange} />
      <button onClick={sendMessage}>Send</button>
      {typing && <div>Someone is typing...</div>}
      <div>
        <Snackbar
          open={!!error}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default ChatComponent;
