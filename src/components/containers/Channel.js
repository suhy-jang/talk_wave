import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../contexts/AuthContext';
import { removeToken } from '../../utils/auth';
import axiosInstance from '../../utils/axiosInstance';
import CreateChannelModal from '../pages/CreateChannelModal';
import ErrorNotification from '../utils/ErrorNotification';

function Channel() {
  const [isCreateChannelOpen, setIsCreateChannelOpen] = useState(false);

  const initialState = {
    name: '',
    requiresKey: false,
  };

  const [newChannelData, setNewChannelData] = useState(initialState);
  const [error, setError] = useState(null);
  const [channels, setChannels] = useState([]);

  const { user, setUser } = useAuth();

  useEffect(() => {
    handleGetChannels();
  }, []);

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const handleCreateChannelClose = () => {
    setIsCreateChannelOpen(false);
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

  const handleGetChannels = async () => {
    try {
      const res = await axiosInstance.get('/channel');
      if (res.status === 200) {
        setChannels(res.data.channels);
      }
    } catch (error) {
      setError(error.errors);
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
        setNewChannelData(initialState);
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

        {/* TODO: clicking channel, and typing key, unique key */}
        {channels.map(({ name, key }) => (
          <div key={name}>
            <div>{name}</div>
          </div>
        ))}
      </div>
      <CreateChannelModal
        open={isCreateChannelOpen}
        onClose={handleCreateChannelClose}
        data={newChannelData}
        handleChange={handleChange}
        handleCreateChannel={handleCreateChannel}
      />
      <div className="h-[52px] bg-coolGray-900">
        {user ? <div>{user.name}</div> : null}
        <div onClick={logout}>logout</div>
      </div>
      <ErrorNotification error={error} handleCloseError={handleCloseError} />
    </div>
  );
}

export default Channel;
