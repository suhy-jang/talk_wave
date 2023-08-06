import { useState } from 'react';
import Channel from '../containers/Channel';
import ChatComponent from '../containers/ChatComponent';
import { MOBILE_MAX_WIDTH } from '../../utils/constants';
import useMediaQuery from '@mui/material/useMediaQuery';

function AppLayout() {
  const [onlyChatView, setOnlyChatView] = useState(false);

  const hideChat = () => setOnlyChatView(false);
  const showChat = () => setOnlyChatView(true);

  const isSmallScreen = useMediaQuery(`(max-width:${MOBILE_MAX_WIDTH}px)`);

  return (
    <div className="flex text-center h-screen text-white">
      {(!isSmallScreen || !onlyChatView) && (
        <div onClick={hideChat} className="flex">
          <div className="w-channel bg-coolGray-800 flex-shrink-0">
            <Channel />
          </div>
        </div>
      )}
      <div
        onClick={showChat}
        className="flex-grow bg-coolGray-750 overflow-hidden"
      >
        <ChatComponent hideChat={hideChat} />
      </div>
    </div>
  );
}
export default AppLayout;