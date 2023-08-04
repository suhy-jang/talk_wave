import { useRef, useEffect, useCallback } from 'react';

const useReconnectSocket = (socket) => {
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 1000;

  const handleOpen = useCallback(() => {
    // console.log('Connected to the WebSocket');
    reconnectAttemptsRef.current = 0;
  }, []);

  const handleClose = useCallback(
    (event) => {
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
    },
    [socket]
  );

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
  }, [socket, handleOpen, handleClose]);

  return socket;
};

export default useReconnectSocket;
