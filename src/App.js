import { ThemeProvider } from '@mui/material/styles';
import AuthContainer from './components/containers/AuthContainer';
import AppLayout from './components/layouts/AppLayout';
import theme from './config/theme';
import './config/axiosConfig';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContainer />
      <AppLayout />
    </ThemeProvider>
  );
}

export default App;
