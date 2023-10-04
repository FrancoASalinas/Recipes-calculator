import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Suspense } from 'react';

function App() {
  return (
    <div className='bg-mimipink min-h-screen grid grid-rows-[70px_1fr]'>
      <Header />
      <main className='pt-3 font-incsans max-w-4xl self-center justify-self-center text-richblack mx-auto'>
        <Suspense fallback={<p className='text-3xl'>Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
