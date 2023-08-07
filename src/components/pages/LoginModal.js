import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Box, Button, TextField } from '@mui/material';
import { ModalContainer } from '../styles/ModalStyles';

function LoginModal() {
  const [credentials, setCredentials] = useState({
    id: '',
    password: '',
  });
  const [loginModalOpen, setLoginModalOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    //
  };

  const handleLoginModalOpen = () => {
    setLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setLoginModalOpen(false);
  };

  return (
    <Modal open={loginModalOpen} onClose={handleLoginModalClose}>
      <ModalContainer>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          className="flex flex-col items-center"
        >
          <TextField
            label="ID"
            variant="standard"
            type="text"
            name="id"
            value={credentials.id}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            variant="standard"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </ModalContainer>
    </Modal>
  );
}

export default LoginModal;
