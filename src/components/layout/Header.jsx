import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false);
    const location = useLocation();

    const isActiveRoute = (path) => {
        return location.pathname === path;
    }
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }
    
    return (
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary-600">CrispNews</span>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                <Link 
                  to="/" 
                  className={`text-gray-700 hover:text-primary-600 pb-1 border-b-2 
                    ${isActiveRoute('/') ? 'border-primary-600 text-primary-600 font-medium' : 'border-transparent'}`}
                >
                  Home
                </Link>
                <Link 
                  to="/briefing" 
                  className={`text-gray-700 hover:text-primary-600 pb-1 border-b-2 
                    ${isActiveRoute('/briefing') ? 'border-primary-600 text-primary-600 font-medium' : 'border-transparent'}`}
                >
                  Briefing
                </Link>
                <Link 
                  to="/settings" 
                  className={`text-gray-700 hover:text-primary-600 pb-1 border-b-2 
                    ${isActiveRoute('/settings') ? 'border-primary-600 text-primary-600 font-medium' : 'border-transparent'}`}
                >
                  Settings
                </Link>
              </nav>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-gray-700 focus:outline-none"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
            
            {/* Mobile Navigation */}
            <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-60 mt-4' : 'max-h-0'}`}>
              <nav className="flex flex-col space-y-4 py-2">
                <Link 
                  to="/" 
                  className={`text-gray-700 hover:text-primary-600 py-2 ${isActiveRoute('/') ? 'text-primary-600 font-medium' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/briefing" 
                  className={`text-gray-700 hover:text-primary-600 py-2 ${isActiveRoute('/briefing') ? 'text-primary-600 font-medium' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Briefing
                </Link>
                <Link 
                  to="/settings" 
                  className={`text-gray-700 hover:text-primary-600 py-2 ${isActiveRoute('/settings') ? 'text-primary-600 font-medium' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
              </nav>
            </div>
          </div>
        </header>
      );
};

export default Header;