import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useChannel } from '../../contexts/ChannelContext';
import { removeToken } from '../../utils/auth';
import CreateChannelModal from '../common/CreateChannelModal';
import VerifyKeyModal from '../common/VerifyKeyModal';
import Notification from '../utils/Notification';
import apiRequest from '../../utils/apiRequest';
import { formatMessages } from '../../utils/formatHandling';
import LogoutBar from '../common/LogoutBar';
import ChannelList from '../pages/Channel/ChannelList';
import ChannelListHeader from '../pages/Channel/ChannelListHeader';
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

  const initiateStates = () => {
    setUser(null);
    setChannels([]);
    setSelectedChannel(null);
    setIsCreateChannelOpen(false);
    setNewChannelData(initialCreateChannelState);
    setIsVerifyModalOpen(false);
    setKeyData(initialVerifyKeyState);
    setError(null);
    setSuccess(null);
  };

  const logout = () => {
    removeToken();
    initiateStates();
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

  const handleDeleteChannel = async (id) => {
    try {
      await apiRequest('delete', `/channel/${id}`);
      setSuccess('Channel deletion was successful!');
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

  const openCreateChannelModal = () => setIsCreateChannelOpen(true);

  return (
    <div className="flex flex-col h-screen">
      <div className="h-full">
        <ChannelListHeader openCreateChannelModal={openCreateChannelModal} />
        <ChannelList
          channels={channels}
          selectedChannel={selectedChannel}
          onSelectChannel={onSelectChannel}
          handleDeleteChannel={handleDeleteChannel}
        />
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
      <LogoutBar user={user} logout={logout} />
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
