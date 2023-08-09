import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginModal from '../pages/LoginModal';
import SignupModal from '../pages/SignupModal';
import ErrorNotification from '../utils/ErrorNotification';
import { devLog } from '../../utils/devLog';

function AuthContainer() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const initialState = {
    id: '',
    password: '',
  };

  const [credentials, setCredentials] = useState(initialState);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    try {
      // check token
      handleLoginModalOpen();
    } catch (error) {
      devLog(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('/auth/signup', credentials);

      devLog({ res });
      setSignupModalOpen(false);
    } catch (err) {
      setError(err.response.data.errors);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('/auth/login', credentials);

      devLog({ res });
      setLoginModalOpen(false);
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
