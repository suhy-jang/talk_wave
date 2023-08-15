import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useSocket } from '../../contexts/WebSocketContext';
import useReconnectSocket from '../../hooks/useReconnectSocket';
import NavigationAppBar from '../pages/NavigationAppBar';
import MessageInput from '../pages/MessageInput';
import Notification from '../utils/Notification';
import { devLog } from '../../utils/devLog';
import { formatMessages } from '../../utils/formatHandling';
import { useChannel } from '../../contexts/ChannelContext';
import { useAuth } from '../../contexts/AuthContext';
import apiRequest from '../../utils/apiRequest';
import ChatLine from '../pages/ChatLine';

function ChatComponent({ hideChat }) {
  const initialState = {
    content: '',
  };
  const [message, setMessage] = useState(initialState);
  const [typing, setTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const { user } = useAuth();

  const typingTimeoutRef = useRef(null);
  const listRef = useRef(null);

  const rawSocket = useSocket();
  const socket = useReconnectSocket(rawSocket);

  const { selectedChannel } = useChannel();

  const handleWindowHeight = () => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  };

  const errorHandling = useCallback((message) => {
    console.error('WebSocket Error: ', message);
    setError('A problem occurred with the connection.');
  }, []);

  useEffect(() => {
    if (listRef.current) {
      handleWindowHeight();
      listRef.current.scrollToItem(chatHistory.length - 1, 'end');
    }
  }, [chatHistory]);

  const requestChatHistory = useCallback(async (channelId) => {
    if (!channelId) return;

    try {
      const data = await apiRequest('get', `/message/${channelId}`);
      const messages = data.messages;
      setChatHistory(messages);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (selectedChannel && selectedChannel._id) {
      requestChatHistory(selectedChannel._id);
    }
  }, [requestChatHistory, selectedChannel]);

  useEffect(() => {
    if (socket) {
      socket.onerror = errorHandling;

      socket.on('error', errorHandling);

      // TODO
      // socket.on('userJoined', (message) => {
      //   setChatHistory((prev) => [...prev, message]);
      // });

      socket.on('userLeft', (message) => {
        console.log({ message });
        // setChatHistory((prev) => [...prev, message]);
      });

      socket.on('userTyping', () => {
        setTyping(true);
      });

      socket.on('userStoppedTyping', () => {
        setTyping(false);
      });

      // TODO: 현재 채널만 가져오기
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
      <div className="overflow-y-auto h-[calc(100%-52px)] p-3">
        {user && (
          <List
            height={windowHeight - 100}
            itemCount={chatHistory.length}
            itemSize={60 + 10}
            width={'100%'}
            ref={listRef}
          >
            {({ index, style }) => (
              <ChatLine
                chatHistory={chatHistory}
                user={user}
                index={index}
                style={style}
              />
            )}
          </List>
        )}
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
