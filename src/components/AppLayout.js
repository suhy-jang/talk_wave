import { useState, useEffect } from 'react';
import Channel from './Channel';
import ChatComponent from './ChatComponent';

function AppLayout() {
  const [displayChat, setDisplayChat] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const hideChat = () => setDisplayChat(false);
  const showChat = () => setDisplayChat(true);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex text-center h-screen text-white">
      {(!isSmallScreen || !displayChat) && (
        <div onClick={hideChat} className="flex">
          <div className="w-server bg-coolGray-950 flex-shrink-0">server</div>
          <div className="w-channel bg-coolGray-800 flex-shrink-0">
            <Channel />
          </div>
        </div>
      )}
      <div
        onClick={showChat}
        className="flex-grow bg-coolGray-750 overflow-hidden"
      >
        <ChatComponent hideChat={hideChat} isSmallScreen={isSmallScreen} />
      </div>
    </div>
  );
}
export default AppLayout;
