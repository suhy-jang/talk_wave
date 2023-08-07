import { ThemeProvider } from '@mui/material/styles';
import LoginModal from './components/pages/LoginModal';
import AppLayout from './components/layouts/AppLayout';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoginModal />
      <AppLayout />
    </ThemeProvider>
  );
}

export default App;
