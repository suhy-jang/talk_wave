import React, { useState, useEffect } from 'react';
import { useSocket } from '../contexts/WebSocketContext';

function ChatComponent() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (incomingMessage) => {
        console.log(`received message: ${incomingMessage}`);
        setChatHistory((prev) => [...prev, incomingMessage]);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit('sendMessage', message);
      console.log(`message sent ${message}`);
      setMessage('');
    } else {
      console.log('no socket provided');
    }
  };

  return (
    <div>
      <div>
        {chatHistory.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatComponent;
