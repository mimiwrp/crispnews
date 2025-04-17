import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBriefing } from '../../context/BriefingContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  // We'll use pathname instead of relying on currentBriefing
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-gray-800">Crisp</span>
              <span className="text-primary-600">News</span>
            </span>
          </Link>
          
          {/* Navigation for desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium ${location.pathname === '/' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Home
            </Link>
            {/* Always show briefing link - it will redirect to home if no briefing exists */}
            <Link 
              to={location.pathname.includes('/briefing') ? location.pathname : '/briefing/highlights'}
              className={`font-medium ${location.pathname.includes('/briefing') ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Briefing
            </Link>
            <Link 
              to="/settings" 
              className={`font-medium ${location.pathname === '/settings' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Settings
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-600 focus:outline-none" 
            onClick={toggleMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <div className="flex flex-col space-y-3 pb-3">
              <Link 
                to="/" 
                className={`font-medium ${location.pathname === '/' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {/* Always show briefing link in mobile menu too */}
              <Link 
                to={location.pathname.includes('/briefing') ? location.pathname : '/briefing/highlights'}
                className={`font-medium ${location.pathname.includes('/briefing') ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Briefing
              </Link>
              <Link 
                to="/settings" 
                className={`font-medium ${location.pathname === '/settings' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;