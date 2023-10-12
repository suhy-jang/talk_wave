import {
  Box,
  FormControlLabel,
  TextField,
  Checkbox,
  Button,
  Modal,
} from '@mui/material';
import { ModalContainer } from '../styles/ModalStyles';

function CreateChannelModal({
  open,
  onClose,
  data,
  handleChange,
  handleCreateChannel,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreateChannel();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            '& .MuiTextField-root': { width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          className="flex flex-col items-start p-1"
        >
          <TextField
            label="Name"
            variant="standard"
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={data.requiresKey}
                name="requiresKey"
                onChange={handleChange}
              />
            }
            label="Requires Key"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </ModalContainer>
    </Modal>
  );
}

export default CreateChannelModal;
