import { LogOut, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser';
import { useContentStore } from '../store/content';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const {user, logout} = useAuthStore();

    const {setContentType} = useContentStore();

  return (

    <header className="max-w-6xl mx-auto flex flex-wrap 
    items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50">
            <Link to="/">
                <img src="/netflix-logo.png" alt="Netflix Logo" 
                className='w-32 sm:w-40'/>
            </Link>

            {/* desktop navbar */}
            <div className='hidden sm:flex gap-2 items-center'>
                <Link to="/" className='hover:underline hover:opacity-80' onClick={() => setContentType("movie")}>Movies</Link>
                <Link to="/" className='hover:underline hover:opacity-80' onClick={() => setContentType("tv")}>TV Shows</Link>
                <Link to="/history" className='hover:underline hover:opacity-80'>Search History</Link>
            </div>
        </div>

        <div className='flex gap-2 items-center z-50'>
            <Link to={"/search"}>
                <Search className="size-6 cursor-pointer" />
            </Link>
            <img src={user.image} alt="avatar" 
            className='h-8 rounded cursor-pointer'/>
            <LogOut className="size-6 cursor-pointer" onClick={logout}/>

            <div className='sm:hidden'>
                <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu}/>
            </div>

        </div>

        {/* mobile navbar */}
        {isMobileMenuOpen && (
            <div className="w-full sm:hidden mt-4 z-50 bg-black 
            border rounded border-gray-800">
                <Link to="/" className='block p-2 hover:underline hover:opactiy-80'
                onClick={() => { toggleMobileMenu; setContentType("movie") }}>Movies</Link>
                <Link to="/" className='block p-2 hover:underline hover:opactiy-80'
                onClick={() => { toggleMobileMenu; setContentType("tv") }}>TV Shows</Link>
                <Link to="/history" className='block p-2 hover:underline hover:opactiy-80'
                onClick={toggleMobileMenu}>Search History</Link>
            </div>
            )}
        
    </header>
  )
}

export default Navbar