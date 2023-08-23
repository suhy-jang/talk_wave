import { useRef, useEffect, useCallback } from 'react';
import { devLog } from '../utils/devLog';
import { MAX_RECONNECT_ATTEMPTS } from '../utils/constants';

const useReconnectSocket = (socket) => {
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = MAX_RECONNECT_ATTEMPTS;
  const reconnectInterval = 1000;

  const handleOpen = useCallback(() => {
    devLog('Connected to the WebSocket');
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
      }
    },
    [maxReconnectAttempts, socket]
  );

  const useVisibilityChange = (onVisible) => {
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          onVisible();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
      };
    }, [onVisible]);
  };

  useVisibilityChange(() => {
    if (!socket.connected) {
      socket.connect();
    }
  });

  useEffect(() => {
    if (!socket) {
      devLog('no socket provided on the useReconnectSocket');
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
