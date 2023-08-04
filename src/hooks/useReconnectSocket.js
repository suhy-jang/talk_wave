import { useRef, useEffect } from 'react';

const useReconnectSocket = (socket) => {
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 1000;

  const handleOpen = () => {
    // console.log('Connected to the WebSocket');
    reconnectAttemptsRef.current = 0;
  };

  const handleClose = (event) => {
    if (
      !event.wasClean &&
      reconnectAttemptsRef.current < maxReconnectAttempts
    ) {
      setTimeout(
        () => socket.connect(),
        reconnectInterval * Math.pow(2, maxReconnectAttempts.current)
      );
      reconnectAttemptsRef.current++;
    } else {
      // disconnected
    }
  };

  useEffect(() => {
    if (!socket) {
      console.log('no socket provided on the useReconnectSocket');
      return;
    }

    socket.on('connect', handleOpen);
    socket.on('disconnect', handleClose);

    return () => {
      socket.off('connect', handleOpen);
      socket.off('disconnect', handleClose);
    };
  }, [socket]);

  return socket;
};

export default useReconnectSocket;
