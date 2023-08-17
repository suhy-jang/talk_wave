import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Channel from '../containers/Channel';
import ChatContainer from '../containers/Chat';
import { MOBILE_MAX_WIDTH } from '../../utils/constants';
import AuthContainer from '../containers/Auth';

function AppLayout() {
  const [onlyChatView, setOnlyChatView] = useState(false);

  const hideChat = () => setOnlyChatView(false);
  const showChat = () => setOnlyChatView(true);

  const isSmallScreen = useMediaQuery(`(max-width:${MOBILE_MAX_WIDTH}px)`);

  return (
    <>
      <AuthContainer />
      <div className="flex h-screen text-center text-white">
        {(!isSmallScreen || !onlyChatView) && (
          <div onClick={hideChat} className="flex">
            <div className="w-[240px] bg-coolGray-800 flex-shrink-0">
              <Channel />
            </div>
          </div>
        )}
        <div
          onClick={showChat}
          className="flex-grow overflow-hidden bg-coolGray-750"
        >
          <ChatContainer hideChat={hideChat} />
        </div>
      </div>
    </>
  );
}
export default AppLayout;
