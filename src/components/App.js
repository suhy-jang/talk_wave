import { WebSocketProvider } from '../contexts/WebSocketContext';
import '../css/tailwind.css';
import PageHead from './PageHead';
import AppLayout from './AppLayout';

function App() {
  return (
    <WebSocketProvider>
      <PageHead
        title="talk wave"
        description="Talk Wave is a chat app designed to simplify communication with friends, family, and colleagues. It offers real-time text messaging, basic voice and a straightforward file-sharing option. Boasting an intuitive interface, it's easily understood and used by people of all ages. With basic encryption technology, it ensures the protection of personal information. With its straightforward setup process, anyone can get started instantly. Talk Wave aims to make everyday communication more convenient."
      />
      <AppLayout />
    </WebSocketProvider>
  );
}

export default App;
