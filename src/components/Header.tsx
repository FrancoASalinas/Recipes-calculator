import logo from '../assets/logo.svg'

function Header() {
    return ( <header className='w-full flex justify-center items-center px-3 py-2'>
    <img src={logo} alt="Reciper logo" className='w-[12rem] h-auto' />
  </header> );
}

export default Header;