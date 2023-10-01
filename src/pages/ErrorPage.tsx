import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className='flex flex-col justify-between gap-5 items-center'>
      <div className='space-y-1 text-center'>
        <h1 className='text-6xl font-croissant '>Error 404</h1>
        <h2 className='text-4xl font-croissant'>Page not found</h2>
      </div>
      <p className='text-3xl text-center'>
        The page you are looking for does not exist, please check the URL or:
      </p>
      <div className='flex-col mt-3 flex group h-fit w-fit'>
        <Link to='/' className='text-2xl'>
          Go to Homepage
        </Link>
        <div className='h-[2px] w-0 group-hover:w-full bg-nn transition-all'></div>
      </div>
    </div>
  );
}

export default ErrorPage;
