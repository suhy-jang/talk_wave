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
import { useChannel } from '../../contexts/ChannelContext';
import { REQUIRED_SUBSCRIPTION } from '../../utils/constants';

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
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [channels, setChannels] = useState([]);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [keyData, setKeyData] = useState(initialVerifyKeyState);

  const { user, setUser } = useAuth();
  const { selectedChannel, setSelectedChannel } = useChannel();

  const logout = () => {
    removeToken();
    setUser(null);
    setChannels([]);
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

  const selectChannel = useCallback(
    (channel) => {
      if (channel.key === REQUIRED_SUBSCRIPTION) {
        setIsVerifyModalOpen(true);
        setKeyData({ id: channel._id });
      } else {
        setSelectedChannel(channel);
      }
    },
    [setSelectedChannel]
  );

  const onSelectChannel = useCallback(
    (channel) => {
      selectChannel(channel);
    },
    [selectChannel]
  );

  const handleGetChannels = useCallback(async () => {
    try {
      const data = await apiRequest('get', '/channel');
      const channels = data.channels;
      setChannels(channels);
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (user && (!channels || channels.length === 0)) {
      handleGetChannels();
    }
  }, [user, channels, handleGetChannels]);

  const handleVerifyChannel = async () => {
    const { key, id } = keyData;
    try {
      const data = await apiRequest('post', '/channel/verify', { key, id });
      setSuccess('Channel verification was successful!');
      setIsVerifyModalOpen(false);
      setKeyData(initialVerifyKeyState);
      handleGetChannels();
      setSelectedChannel(data.channel);
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
      <div className="h-full">
        <div className="h-[40px]">
          <div className="flex items-center justify-between w-full text-xs uppercase">
            <div className="px-4 py-3 font-semibold text-coolGray-400">
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
            onClick={() => onSelectChannel(channel)}
            className={`border-b border-b-coolGray-500 cursor-pointer py-2 text-lg flex justify-center ${
              selectedChannel?._id === channel._id ? 'bg-coolGray-600' : ''
            }`}
          >
            <div>{channel.name}</div>
            {channel.key && channel.key === REQUIRED_SUBSCRIPTION && (
              <LockIcon />
            )}
            {channel.key && channel.key !== REQUIRED_SUBSCRIPTION && (
              <LockOpenIcon />
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
      <VerifyKeyModal
        open={isVerifyModalOpen}
        onClose={handleVerifyChannelClose}
        data={keyData}
        handleChange={handleChangeKey}
        handleVerifyChannel={handleVerifyChannel}
      />
      <div className="flex flex-row items-center justify-between px-4 h-logoutBar bg-coolGray-900">
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
