import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f2937', // purple
      light: '#3e4b59',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4b5563', // grey
      light: '#6e7282',
      contrastText: '#ffffff',
    },
  },
});

export default theme;
