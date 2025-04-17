import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-semibold">
              <span className="text-gray-800">Crisp</span>
              <span className="text-primary-600">News</span>
            </span>
            <p className="text-sm text-gray-600 mt-1">
              Smart news, snack-sized.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">About</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          &copy; {currentYear} CrispNews. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;