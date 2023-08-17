import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useSocket } from '../../contexts/WebSocketContext';
import useReconnectSocket from '../../hooks/useReconnectSocket';
import NavigationAppBar from '../pages/NavigationAppBar';
import Notification from '../utils/Notification';
import { devLog } from '../../utils/devLog';
import { formatMessages } from '../../utils/formatHandling';
import { useChannel } from '../../contexts/ChannelContext';
import { useAuth } from '../../contexts/AuthContext';
import apiRequest from '../../utils/apiRequest';
import ChatLine from '../pages/ChatLine';
import { devError } from '../../utils/devLog';
import SubscribersList from '../pages/SubscribersList';

function ChatComponent({ hideChat }) {
  const initialState = {
    content: '',
  };
  const [message, setMessage] = useState(initialState);
  const [typing, setTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [info, setInfo] = useState(null);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [subscribers, setSubscribers] = useState([]);

  const typingTimeoutRef = useRef(null);
  const listRef = useRef(null);
  const prevChannelRef = useRef(null);

  const rawSocket = useSocket();
  const socket = useReconnectSocket(rawSocket);
  const { user } = useAuth();
  const { selectedChannel } = useChannel();

  // Clipboard functionality works only when served over HTTPS or from localhost.
  const handleCopyKey = () => {
    const location = window.location;

    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      setError(
        'Clipboard functionality is available only over HTTPS or from localhost.'
      );
      return;
    }

    if (navigator.clipboard && selectedChannel && selectedChannel.key) {
      try {
        navigator.clipboard.writeText(selectedChannel.key);
        setInfo('Key copied to clipboard!');
      } catch (error) {
        setError('Failed to copy key to clipboard: ', error);
      }
    } else {
      setError('Not available');
    }
  };

  const handleShowAttendee = () => {
    setShowSubscribers(!showSubscribers);
  };

  useEffect(() => {
    if (!selectedChannel || !selectedChannel.key) {
      setShowSubscribers(false);
    }
  }, [selectedChannel]);

  const handleWindowHeight = () => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  };

  const errorHandling = useCallback((message) => {
    devError('WebSocket Error: ', message);
    setError('A problem occurred with the connection.');
  }, []);

  useEffect(() => {
    prevChannelRef.current = selectedChannel;
  }, [selectedChannel]);

  useEffect(() => {
    const cleanup = handleWindowHeight();
    if (listRef.current) {
      listRef.current.scrollToItem(chatHistory.length - 1, 'end');
    }
    return cleanup;
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

  const requestSubscribers = useCallback(async (channelId) => {
    if (!channelId) return;

    try {
      const data = await apiRequest(
        'get',
        `/privateSubscription/users/${channelId}`
      );
      setSubscribers(data.subscribers);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (selectedChannel && selectedChannel._id) {
      requestChatHistory(selectedChannel._id);
      requestSubscribers(selectedChannel._id);
    }
  }, [requestChatHistory, requestSubscribers, selectedChannel]);

  useEffect(() => {
    if (socket && user) {
      if (prevChannelRef.current) {
        socket.emit('leaveChannel');
      }
      if (selectedChannel) {
        socket.emit('joinChannel', {
          channel: selectedChannel._id,
          userName: user.name,
        });
      }
    }
  }, [socket, user, selectedChannel]);

  useEffect(() => {
    if (socket) {
      socket.onerror = errorHandling;

      socket.on('error', errorHandling);

      socket.on('userJoined', (message) => {
        setChatHistory((prev) => [...prev, { event: message }]);
      });

      socket.on('userLeft', (message) => {
        setChatHistory((prev) => [...prev, { event: message }]);
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
  }, [socket, errorHandling, selectedChannel, user]);

  const sendMessage = (e) => {
    if (e.key !== 'Enter') return;

    if (socket) {
      e.preventDefault();

      socket.emit('stopTyping');
      const { content } = message;
      socket.emit('sendMessage', { content }, (response) => {
        if (response.error) {
          setError(response.error);
        }
      });
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

  const handleCloseInfo = () => {
    setInfo(null);
  };

  const handleInviteUser = (e) => {
    e.stopPropagation();
    handleCopyKey();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="relative">
        <NavigationAppBar
          hideChat={hideChat}
          handleShowAttendee={handleShowAttendee}
          enteredChannel={selectedChannel && selectedChannel.key}
        />
        {showSubscribers && (
          <SubscribersList
            subscribers={subscribers}
            handleInviteUser={handleInviteUser}
          />
        )}
      </div>
      {user && (
        <div className="p-3">
          <List
            height={windowHeight - 120}
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
        </div>
      )}
      <div className="pl-3 pr-2 text-left">
        <input
          value={message.content}
          onChange={handleInputChange}
          onKeyDown={sendMessage}
          placeholder="Type a message and press Enter"
          className="w-full px-2 py-1 border-none rounded-md outline-none bg-coolGray-700"
        />
        {typing && <div>Someone is typing...</div>}
      </div>
      <Notification
        severity="error"
        messages={formatMessages(error, (err) => err.msg)}
        handleClose={handleCloseError}
      />
      <Notification
        severity="info"
        messages={info}
        handleClose={handleCloseInfo}
      />
    </div>
  );
}

export default ChatComponent;
