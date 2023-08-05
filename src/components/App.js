import { WebSocketProvider } from '../contexts/WebSocketContext';
import '../css/tailwind.css';
import ChatComponent from './ChatComponent';

function App() {
  return (
    <WebSocketProvider>
      <div className="flex text-center h-screen">
        <div className="w-server bg-coolGray-900">server</div>
        <div className="w-channel bg-coolGray-800">server</div>
        <ChatComponent className="flex-grow bg-coolGray-700" />
      </div>
    </WebSocketProvider>
  );
}

export default App;
