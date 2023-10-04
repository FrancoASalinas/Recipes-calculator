import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'

function Header() {
    return ( <header className='w-full flex justify-center items-center px-3 py-2'>
    <Link to='/Recipes-calculator/'>
    <img src={logo} alt="Reciper logo" className='w-[12rem] h-auto' />
    </Link>
  </header> );
}

export default Header;