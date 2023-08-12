import React, { useState, useEffect, useCallback } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../contexts/AuthContext';
import { removeToken } from '../../utils/auth';
import CreateChannelModal from '../pages/CreateChannelModal';
import Notification from '../utils/Notification';
import { Box } from '@mui/material';
import VerifyKeyModal from '../pages/VerifyKeyModal';
import { formatMessages } from '../../utils/formatHandling';
import apiRequest from '../../utils/apiRequest';

function Channel() {
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);

  const initialCreateChannelState = {
    name: '',
    requiresKey: false,
  };

  const initialVerifyKeyState = {
    key: '',
    id: '',
  };

  const [newChannelData, setNewChannelData] = useState(
    initialCreateChannelState
  );
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [channels, setChannels] = useState([]);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [keyData, setKeyData] = useState(initialVerifyKeyState);
  const [userChannelIds, setUserChannelIds] = useState([]);

  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      handleGetSubscribedChannels(user._id);
    }
  }, [user]);

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const handleCreateChannelClose = () => {
    setIsCreateChannelOpen(false);
  };

  const handleVerifyChannelClose = () => {
    setIsVerifyModalOpen(false);
  };

  const handleChangeKey = (e) => {
    const { name, value } = e.target;
    setKeyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setNewChannelData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setNewChannelData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const selectChannel = (channel, hasKey) => {
    if (channel.key && !hasKey) {
      setIsVerifyModalOpen(true);
      setSelectedChannel(channel);
      // TODO: show chat data when verified
      setKeyData({ id: channel._id });
    } else {
      setSelectedChannel(channel);
    }

    // TODO: update chats
  };

  const selectFirstChannel = useCallback(
    (channels) => {
      if (!selectedChannel && channels.length > 0) {
        selectChannel(channels[0]);
      }
    },
    [selectedChannel]
  );

  const handleGetSubscribedChannels = async (userId) => {
    try {
      const data = await apiRequest('get', '/channel/subscribed', {
        params: { userId },
      });
      const channelIds = data.subscribedChannels;
      setUserChannelIds(channelIds);
    } catch (error) {
      setError(error);
    }
  };

  const handleGetChannels = useCallback(async () => {
    try {
      const data = await apiRequest('get', '/channel');
      const channels = data.channels;
      setChannels(channels);
      selectFirstChannel(channels);
    } catch (error) {
      setError(error);
    }
  }, [selectFirstChannel]);

  useEffect(() => {
    if (user && (!channels || channels.length === 0)) {
      handleGetChannels();
    }
  }, [user, channels, handleGetChannels]);

  const handleVerifyChannel = async () => {
    const { key, id } = keyData;
    try {
      await apiRequest('post', '/channel/verify', { key, id });
      setSuccess('Channel verification was successful!');
      setIsVerifyModalOpen(false);
      setKeyData(initialVerifyKeyState);
      handleGetChannels();
      handleGetSubscribedChannels();
    } catch (error) {
      setError(error);
    }
  };

  const handleCreateChannel = async () => {
    const { name, requiresKey } = newChannelData;
    try {
      await apiRequest('post', '/channel', { name, requiresKey });
      setSuccess('Channel creation was successful!');
      setIsCreateChannelOpen(false);
      setNewChannelData(initialCreateChannelState);
      handleGetChannels();
      handleGetSubscribedChannels();
    } catch (error) {
      setError(error);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  const handleCloseSuccess = () => {
    setSuccess(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-[calc(100%-52px)]">
        <div className="h-[40px]">
          <div className="uppercase text-xs flex justify-between items-center w-full">
            <div className="px-4 py-3 text-coolGray-400 font-semibold">
              Channel
            </div>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setIsCreateChannelOpen(true)}
            >
              <AddIcon />
            </IconButton>
          </div>
        </div>
        {channels.map((channel) => (
          <Box
            key={channel._id}
            onClick={() => {
              const subscribed = userChannelIds.includes(channel._id);
              selectChannel(channel, subscribed);
            }}
            className={`cursor-pointer py-2 text-lg flex justify-center ${
              selectedChannel?._id === channel._id ? 'bg-coolGray-600' : ''
            }`}
          >
            <div>{channel.name}</div>
            {channel.key && user && (
              <>
                {userChannelIds.includes(channel._id) ? (
                  <LockOpenIcon />
                ) : (
                  <LockIcon />
                )}
              </>
            )}
          </Box>
        ))}
      </div>
      <CreateChannelModal
        open={isCreateChannelOpen}
        onClose={handleCreateChannelClose}
        data={newChannelData}
        handleChange={handleChange}
        handleCreateChannel={handleCreateChannel}
      />
      {selectedChannel?.key && (
        <VerifyKeyModal
          open={isVerifyModalOpen}
          onClose={handleVerifyChannelClose}
          data={keyData}
          handleChange={handleChangeKey}
          handleVerifyChannel={handleVerifyChannel}
        />
      )}
      <div className="h-[52px] flex flex-row justify-between items-center px-4 bg-coolGray-900">
        {user ? <div>{user.name}</div> : null}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logout"
          onClick={logout}
        >
          <LogoutIcon />
        </IconButton>
      </div>
      <Notification
        severity="error"
        messages={formatMessages(error, (err) => err.msg)}
        handleClose={handleCloseError}
      />
      <Notification
        severity="success"
        messages={success}
        handleClose={handleCloseSuccess}
      />
    </div>
  );
}

export default Channel;
