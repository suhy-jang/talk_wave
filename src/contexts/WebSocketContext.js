import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getToken } from '../utils/auth';

const WebSocketContext = createContext(null);

export const useSocket = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = getToken();
    const newSocket = io('http://localhost:4000', {
      query: { token },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
