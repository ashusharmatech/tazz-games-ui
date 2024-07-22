import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Close the mobile menu when the window is resized to a larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setNav(false); // Close the sidebar on resize
      }
    };
    
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Home', icon: faHome },
    { id: 2, text: 'Facebook', icon: faFacebook },
    { id: 3, text: 'Instagram', icon: faInstagram },
    { id: 4, text: 'LinkedIn', icon: faLinkedin },
  ];

  return (
    <div className='bg-pink-500 flex justify-between items-center h-14 mx-auto px-4 text-white'>
      {/* Logo */}
      <h1 className='w-full text-3xl font-bold text-white cursive' style={{ fontFamily: 'Pacifico' }}>Tazz Games</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='px-4 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 cursor-pointer'
          >
            {item.icon && <FontAwesomeIcon icon={item.icon} className='text-lg leading-lg text-white opacity-75 mr-2' />}
            {item.text}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed left-0 top-0 w-[60%] h-full bg-pink-500 border-r border-r-gray-900 ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] bg-pink-500'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-white m-4 cursive'>tazz-games</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b border-gray-600 rounded-xl flex items-center hover:bg-pink-300 duration-300 hover:text-white cursor-pointer'
          >
            {item.icon && <FontAwesomeIcon icon={item.icon} className='text-lg leading-lg text-white opacity-75 mr-2' />}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
