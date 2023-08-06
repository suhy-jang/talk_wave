import { WebSocketProvider } from '../contexts/WebSocketContext';
import '../css/tailwind.css';
import ChatComponent from './ChatComponent';
import PageHead from './PageHead';
import Channel from './Channel';

function App() {
  return (
    <WebSocketProvider>
      <PageHead
        title="talk wave"
        description="Talk Wave is a chat app designed to simplify communication with friends, family, and colleagues. It offers real-time text messaging, basic voice and a straightforward file-sharing option. Boasting an intuitive interface, it's easily understood and used by people of all ages. With basic encryption technology, it ensures the protection of personal information. With its straightforward setup process, anyone can get started instantly. Talk Wave aims to make everyday communication more convenient."
      />
      <div className="flex text-center h-screen text-white">
        <div className="w-server bg-coolGray-950">server</div>
        <Channel className="w-channel bg-coolGray-800" />
        <ChatComponent className="flex-grow bg-coolGray-750" />
      </div>
    </WebSocketProvider>
  );
}

export default App;
