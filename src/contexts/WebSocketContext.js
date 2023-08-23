import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getToken } from '../utils/auth';
import { useAuth } from './AuthContext';

const WebSocketContext = createContext(null);

export const useSocket = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const token = getToken();
    if (user && token) {
      const newSocket = io(process.env.REACT_APP_API_URL, {
        query: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0.5,
      });
      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [user]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
