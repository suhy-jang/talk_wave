import Alert from './AlertWrapper';
import Snackbar from '@mui/material/Snackbar';
import { getErrorMessage } from '../../utils/errorHandling';

function ErrorNotification({ error, handleCloseError }) {
  const errorMessage = getErrorMessage(error);

  return (
    <div>
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ErrorNotification;
