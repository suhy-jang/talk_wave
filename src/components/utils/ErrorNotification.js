import Alert from './AlertWrapper';
import Snackbar from '@mui/material/Snackbar';

function ErrorNotification({ error, handleCloseError }) {
  return (
    <div>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ErrorNotification;
