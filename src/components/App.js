import { WebSocketProvider } from '../contexts/WebSocketContext';
import '../css/App.css';
import ChatComponent from './ChatComponent';

function App() {
  return (
    <WebSocketProvider>
      <ChatComponent />
    </WebSocketProvider>
  );
}

export default App;
