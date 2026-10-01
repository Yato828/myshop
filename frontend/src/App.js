import { useState } from 'react';
import AgentsPage from './pages/AgentsPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [page, setPage] = useState('home');

  if (page === 'register') {
    return <RegisterPage onClose={() => setPage('home')} />;
  }

  return <AgentsPage onAccountClick={() => setPage('register')} />;
}

export default App;
