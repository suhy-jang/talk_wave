import Modal from '@mui/material/Modal';
import { Box, Button, TextField } from '@mui/material';
import { ModalContainer } from '../styles/ModalStyles';

function LoginModal({
  open,
  switchToSignup,
  credentials,
  handleChange,
  handleLogin,
}) {
  return (
    <Modal open={open} onClose={() => {}}>
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
          <div className="mt-3" />
          <Button variant="text" color="primary" onClick={switchToSignup}>
            Don't have an account? Sign Up
          </Button>
        </Box>
      </ModalContainer>
    </Modal>
  );
}

export default LoginModal;
