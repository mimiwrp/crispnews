import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-white shadow-sm hidden md:block">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src="/cn_logo.png" alt="Crisp News Logo" className="h-8 mr-2" />
              <span className="text-2xl font-bold">
                <span className="text-gray-800">Crisp</span>
                <span className="text-primary-600">News</span>
              </span>
            </Link>
            
            {/* Navigation for desktop */}
            <nav className="flex items-center space-x-6">
              <Link
                to="/"
                className={`font-medium ${location.pathname === '/' ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                Home
              </Link>
              {/* <Link
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
              </Link> */}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Header - Just Logo */}
      <header className="bg-white shadow-sm md:hidden">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-gray-800">Crisp</span>
                <span className="text-primary-600">News</span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-10">
        <div className="flex justify-around items-center">
          <Link
            to="/"
            className={`flex flex-col items-center py-2 px-3 w-1/3 ${
              location.pathname === '/' ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link
            to={location.pathname.includes('/briefing') ? location.pathname : '/briefing/highlights'}
            className={`flex flex-col items-center py-2 px-3 w-1/3 ${
              location.pathname.includes('/briefing') ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span className="text-xs mt-1">Briefing</span>
          </Link>
          
          <Link
            to="/settings"
            className={`flex flex-col items-center py-2 px-3 w-1/3 ${
              location.pathname === '/settings' ? 'text-primary-600' : 'text-gray-600'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </nav>

      {/* Add padding at the bottom to account for the fixed navigation */}
      <div className="md:hidden h-16"></div>
    </>
  );
};

export default Header;