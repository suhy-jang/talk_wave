import Alert from './AlertWrapper';
import Snackbar from '@mui/material/Snackbar';

function Notification({ messages, severity, handleClose }) {
  return (
    <div>
      <Snackbar
        open={!!messages}
        autoHideDuration={3000}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
      >
        <Alert onClose={handleClose} severity={severity}>
          {messages}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Notification;
