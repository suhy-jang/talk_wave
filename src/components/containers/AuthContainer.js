import React, { useState, useEffect } from 'react';
import LoginModal from '../pages/LoginModal';
import SignupModal from '../pages/SignupModal';
import ErrorNotification from '../utils/ErrorNotification';
import { useAuth } from '../../contexts/AuthContext';
import { setToken } from '../../utils/auth';
import axiosInstance from '../../utils/axiosInstance';

function AuthContainer() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const initialState = {
    id: '',
    username: '',
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

  const handleSignup = async () => {
    try {
      const res = await axiosInstance.post('/auth/signup', {
        id: credentials.id,
        username: credentials.username,
        password: credentials.password,
      });
      if (res.status === 201 && res.data.token) {
        setUser(res.data.user);
        handleSignupModalClose();
        const token = res.data.token;
        setToken(token);
      }
    } catch (err) {
      setError(err.response.data.errors);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post('/auth/login', {
        id: credentials.id,
        password: credentials.password,
      });
      if (res.status === 200 && res.data.token) {
        setUser(res.data.user);
        handleLoginModalClose();
        const token = res.data.token;
        setToken(token);
      }
    } catch (err) {
      setError(err.response.data.errors);
    }
  };

  const handleLoginModalOpen = () => setLoginModalOpen(true);
  const handleLoginModalClose = () => setLoginModalOpen(false);
  const handleSignupModalOpen = () => setSignupModalOpen(true);
  const handleSignupModalClose = () => setSignupModalOpen(false);

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
      <ErrorNotification error={error} handleCloseError={handleCloseError} />
    </div>
  );
}

export default AuthContainer;
