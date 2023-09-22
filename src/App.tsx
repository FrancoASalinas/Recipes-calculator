import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className='bg-mimipink min-h-screen'>
      <Header />
      <main className='pt-3 font-incsans max-w-4xl mx-auto'>
      <Outlet />
      </main>
    </div>
  );
}

export default App;
