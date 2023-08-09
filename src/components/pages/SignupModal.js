import Modal from '@mui/material/Modal';
import { Box, Button, TextField } from '@mui/material';
import { ModalContainer } from '../styles/ModalStyles';

function SignupModal({
  open,
  switchToLogin,
  credentials,
  handleChange,
  handleSignup,
}) {
  return (
    <Modal open={open} onClose={() => {}}>
      <ModalContainer>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {
              m: 1,
              width: '25ch',
            },
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
            className="bg-transparent"
            required
          />
          <TextField
            label="Password (minimum 5 letters)"
            variant="standard"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="bg-transparent"
            required
          />
          <Button variant="contained" onClick={handleSignup}>
            Sign Up
          </Button>
          <div className="mt-3" />
          <Button
            sx={{ fontSize: 12 }}
            variant="text"
            color="primary"
            onClick={switchToLogin}
          >
            Already have an account? Log In
          </Button>
        </Box>
      </ModalContainer>
    </Modal>
  );
}

export default SignupModal;
