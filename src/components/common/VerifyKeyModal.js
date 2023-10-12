import { Modal, Box, TextField, Button } from '@mui/material';
import { ModalContainer } from '../styles/ModalStyles';

function VerifyKeyModal({
  open,
  onClose,
  key,
  handleChange,
  handleVerifyChannel,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerifyChannel();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': { mb: 2, width: '100%' },
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
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </ModalContainer>
    </Modal>
  );
}

export default VerifyKeyModal;
