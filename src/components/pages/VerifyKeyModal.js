import { Modal, Box, TextField, Button } from '@mui/material';
import { ModalContainer } from '../styles/ModalStyles';

function VerifyKeyModal({
  open,
  onClose,
  key,
  handleChange,
  handleVerifyChannel,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          className="flex flex-col items-start p-1"
        >
          <TextField
            label="Key"
            variant="standard"
            type="text"
            name="key"
            value={key}
            onChange={handleChange}
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleVerifyChannel}
          >
            Submit
          </Button>
        </Box>
      </ModalContainer>
    </Modal>
  );
}

export default VerifyKeyModal;
