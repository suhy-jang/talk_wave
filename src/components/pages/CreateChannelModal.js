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
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateChannel}
          >
            Submit
          </Button>
        </Box>
      </ModalContainer>
    </Modal>
  );
}

export default CreateChannelModal;
