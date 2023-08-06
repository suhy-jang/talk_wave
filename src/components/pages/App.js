import { WebSocketProvider } from '../../contexts/WebSocketContext';
import '../../css/tailwind.css';
import AppLayout from '../layouts/AppLayout';
import MainHead from '../utils/MainHead';

function App() {
  return (
    <WebSocketProvider>
      <MainHead iconBgColor="#000000" />
      <AppLayout />
    </WebSocketProvider>
  );
}

export default App;
