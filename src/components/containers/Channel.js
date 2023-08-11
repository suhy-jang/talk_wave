import React, { useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../contexts/AuthContext';
import { removeToken } from '../../utils/auth';
import axiosInstance from '../../utils/axiosInstance';
import CreateChannelModal from '../pages/CreateChannelModal';
import ErrorNotification from '../utils/ErrorNotification';
import { Box } from '@mui/material';
import VerifyKeyModal from '../pages/VerifyKeyModal';

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
  const [channels, setChannels] = useState([]);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [keyData, setKeyData] = useState(initialVerifyKeyState);
  const [userChannelIds, setUserChannelIds] = useState([]);

  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      getSubscribedChannels(user._id);
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

  const getSubscribedChannels = async (userId) => {
    try {
      const res = await axiosInstance.get('/channel/subscribed', {
        params: { userId },
      });
      if (res.status === 200) {
        const channelIds = res.data.subscribedChannels;
        setUserChannelIds(channelIds);
      }
    } catch (error) {
      setError(error.errors);
    }
  };

  const handleGetChannels = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/channel');
      if (res.status === 200) {
        const channels = res.data.channels;
        setChannels(channels);
        selectFirstChannel(channels);
      }
    } catch (error) {
      setError(error.errors);
    }
  }, [selectFirstChannel]);

  useEffect(() => {
    if (user && (!channels || channels.length === 0)) {
      handleGetChannels();
    }
  }, [user, channels, handleGetChannels]);

  const handleVerifyChannel = async () => {
    try {
      const { key, id } = keyData;
      const res = await axiosInstance.post('/channel/verify', {
        key,
        id,
      });
      if (res.status === 200) {
        // TODO: success message
        setIsVerifyModalOpen(false);
      } else {
        setError('something went wrong');
      }
    } catch (error) {
      setError(error.response.data.errors);
    }
  };

  const handleCreateChannel = async () => {
    try {
      const { name, requiresKey } = newChannelData;
      const res = await axiosInstance.post(`/channel`, {
        name,
        requiresKey,
      });
      if (res.status === 201) {
        // TODO: success message
        setIsCreateChannelOpen(false);
        handleGetChannels();
        setNewChannelData(initialCreateChannelState);
      } else {
        setError('something went wrong');
      }
    } catch (error) {
      setError(error.response.data.errors);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-[calc(100%-52px)]">
        <div className="h-[40px]">
          <div className="uppercase text-xs flex justify-between items-center w-full">
            <div className="px-4 py-3 text-coolGray-400 font-semibold">
              Channel
            </div>
            <Button
              variant="text"
              color="secondary"
              onClick={() => setIsCreateChannelOpen(true)}
            >
              <AddIcon />
            </Button>
          </div>
        </div>
        {channels.map((channel) => (
          <Box
            key={channel._id}
            onClick={() => {
              const subscribed = userChannelIds.includes(channel._id);
              selectChannel(channel, subscribed);
            }}
            className={`py-2 text-lg flex justify-center ${
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
      <div className="h-[52px] bg-coolGray-900">
        {user ? <div>{user.name}</div> : null}
        <div onClick={logout}>logout</div>
      </div>
      <ErrorNotification error={error} handleCloseError={handleCloseError} />
    </div>
  );
}

export default Channel;
