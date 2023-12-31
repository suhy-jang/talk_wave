import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layouts/AppLayout';
import MainHead from './components/utils/MainHead';

function App() {
  return (
    <Router>
      <MainHead />
      <Routes>
        <Route path="/" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
