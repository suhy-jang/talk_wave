import React, { useState, useEffect } from 'react';
import LoginModal from '../pages/LoginModal';
import SignupModal from '../pages/SignupModal';
import Notification from '../utils/Notification';
import { useAuth } from '../../contexts/AuthContext';
import { setToken } from '../../utils/auth';
import { formatMessages } from '../../utils/formatHandling';
import apiRequest from '../../utils/apiRequest';

function AuthContainer() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const initialState = {
    username: '',
    name: '',
    password: '',
  };

  const [credentials, setCredentials] = useState(initialState);
  const [error, setError] = useState(null);

  const { user, setUser, isLoading } = useAuth();

  useEffect(() => {
    if (!user && !isLoading) {
      handleLoginModalOpen();
    } else {
      handleLoginModalClose();
    }
  }, [user, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginModalOpen = () => setLoginModalOpen(true);
  const handleLoginModalClose = () => setLoginModalOpen(false);
  const handleSignupModalOpen = () => setSignupModalOpen(true);
  const handleSignupModalClose = () => setSignupModalOpen(false);

  const handleSignup = async () => {
    try {
      const data = await apiRequest('post', '/auth/signup', {
        username: credentials.username,
        password: credentials.password,
        name: credentials.name,
      });
      setUser(data.user);
      setToken(data.token);
      handleSignupModalClose();
    } catch (error) {
      setError(error);
    }
  };

  const handleLogin = async () => {
    try {
      const data = await apiRequest('post', '/auth/login', {
        username: credentials.username,
        password: credentials.password,
      });
      setUser(data.user);
      setToken(data.token);
      handleLoginModalClose();
    } catch (error) {
      setError(error);
    }
  };

  const switchToSignup = () => {
    handleLoginModalClose();
    handleSignupModalOpen();
    setCredentials(initialState);
  };

  const switchToLogin = () => {
    handleLoginModalOpen();
    handleSignupModalClose();
    setCredentials(initialState);
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div>
      <LoginModal
        open={loginModalOpen}
        onClose={handleLoginModalClose}
        switchToSignup={switchToSignup}
        credentials={credentials}
        handleChange={handleChange}
        handleLogin={handleLogin}
      />
      <SignupModal
        open={signupModalOpen}
        onClose={handleSignupModalClose}
        switchToLogin={switchToLogin}
        credentials={credentials}
        handleChange={handleChange}
        handleSignup={handleSignup}
      />
      <Notification
        severity="error"
        messages={formatMessages(error, (err) => err.msg)}
        handleClose={handleCloseError}
      />
    </div>
  );
}

export default AuthContainer;
