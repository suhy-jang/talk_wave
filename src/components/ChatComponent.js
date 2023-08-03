import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../contexts/WebSocketContext';

function ChatComponent() {
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const typingTimeoutRef = useRef(null);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('userTyping', () => {
        console.log('start typing');
        setTyping(true);
      });

      socket.on('userStoppedTyping', () => {
        console.log('stop typing');
        setTyping(false);
      });

      socket.on('receiveMessage', (incomingMessage) => {
        // console.log(`received message: ${incomingMessage}`);
        setChatHistory((prev) => [...prev, incomingMessage]);
      });

      return () => {
        socket.off('userTyping');
        socket.off('userStoppedTyping');
        socket.off('receiveMessage');
      };
    }
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('sendMessage', message);
      // console.log(`message sent ${message}`);
      setMessage('');
    } else {
      console.log('no socket provided');
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    if (socket) {
      clearTimeout(typingTimeoutRef.current);
      socket.emit('typing');

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stopTyping');
      }, 1000);
    } else {
      console.log('no socket in the handleInputChange function');
    }
  };

  return (
    <div>
      <div>
        {chatHistory.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input value={message} onChange={handleInputChange} />
      <button onClick={sendMessage}>Send</button>
      {typing && <div>Someone is typing...</div>}
    </div>
  );
}

export default ChatComponent;
