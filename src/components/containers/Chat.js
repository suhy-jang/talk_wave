import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSocket } from '../../contexts/WebSocketContext';
import useReconnectSocket from '../../hooks/useReconnectSocket';
import NavigationAppBar from '../pages/NavigationAppBar';
import MessageList from '../pages/MessageList';
import MessageInput from '../pages/MessageInput';
import Notification from '../utils/Notification';
import { devLog } from '../../utils/devLog';
import { formatMessages } from '../../utils/formatHandling';
import { useChannel } from '../../contexts/ChannelContext';

function ChatComponent({ hideChat }) {
  const initialState = {
    content: '',
  };
  const [message, setMessage] = useState(initialState);
  const [typing, setTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);

  const typingTimeoutRef = useRef(null);

  const rawSocket = useSocket();
  const socket = useReconnectSocket(rawSocket);

  const { selectedChannel } = useChannel();

  const errorHandling = useCallback((message) => {
    console.error('WebSocket Error: ', message);
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
        setTyping(true);
      });

      socket.on('userStoppedTyping', () => {
        setTyping(false);
      });

      socket.on('receiveMessage', (incomingMessage) => {
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
  }, [socket, errorHandling, selectedChannel]);

  const sendMessage = (e) => {
    if (e.key !== 'Enter') return;

    if (socket) {
      e.preventDefault();

      socket.emit('stopTyping');
      const { content } = message;
      socket.emit(
        'sendMessage',
        { content, channel: selectedChannel._id },
        (response) => {
          if (response.error) {
            setError(response.error);
          }
        }
      );
      setMessage(initialState);
    } else {
      devLog('no socket provided in the sendMessage function');
      setError('Unable to send the message. Connection is missing.');
    }
  };

  const handleInputChange = (e) => {
    const content = e.target.value;
    setMessage((prevState) => ({ ...prevState, content }));

    if (socket) {
      clearTimeout(typingTimeoutRef.current);
      socket.emit('typing');

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stopTyping');
      }, 2000);
    } else {
      devLog('no socket in the handleInputChange function');
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <NavigationAppBar hideChat={hideChat} />
      <div className="h-[calc(100%-52px)]">
        <MessageList chatHistory={chatHistory} />
      </div>
      <div className="h-[52px]">
        <MessageInput
          message={message.content}
          typing={typing}
          handleInputChange={handleInputChange}
          sendMessage={sendMessage}
        />
      </div>
      <Notification
        severity="error"
        messages={formatMessages(error, (err) => err.msg)}
        handleClose={handleCloseError}
      />
    </div>
  );
}

export default ChatComponent;
