import React from 'react';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function WrappedAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default Alert;
