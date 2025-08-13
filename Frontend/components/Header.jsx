import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { handleSucces } from '../src/utils';

const Header = ({ theme, setTheme }) => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
  const updateUser = () => {
    const user = localStorage.getItem('loggedInUser');
    setLoggedInUser(user || '');
  };

  updateUser();

  // Listen for storage changes (including our custom dispatch)
  window.addEventListener('storage', updateUser);

  return () => window.removeEventListener('storage', updateUser);
}, []);


  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSucces('Logged out successfully');
    setLoggedInUser('');
    setShowDropdown(false);
    navigate('/login');
  };

  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

return (
  <>
    <div className='navbar'>
      <img src={theme === 'light' ? '/assets/logo-black.png' : '/assets/logo-white.png'} alt='Logo' className='logo' />

      <div className='nav-links'>
        <Link to='/'>Home</Link>
        <Link to='/history'>History</Link>
        <Link to='/about'>About Us</Link>
        <Link to='/contact'>Contact Us</Link>
      </div>

      <img
        onClick={toggle_mode}
        src={theme === 'light' ? '/assets/night.png' : '/assets/day.png'}
        alt='Toggle Theme'
        className='toggle-icon'
      />

      <div className='user-section'>
        {loggedInUser ? (
          <div className='user-dropdown'>
            <img src='/assets/profile.png' alt='Profile' className='profile-img' />
            <span className='username'>Welcome, {loggedInUser}</span>
            <span className='arrow' onClick={toggleDropdown}>▼</span>
            {showDropdown && (
              <div className='dropdown-menu'>
                <button onClick={handleLogOut}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <span className='guest'>Welcome, Guest</span>
        )}
      </div>
    </div>
  </>
);

};

export default Header;
