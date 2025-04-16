import React from 'react';

const Footer = () => { 
    return (
        <footer className="bg-gray-800 text-white py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">CrispNews</h3>
                <p className="text-gray-300">
                  Smart news, snack-sized.
                </p>
              </div>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
                <a href="#" className="text-gray-300 hover:text-white">
                  About Us
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Terms of Service
                </a>
              </div>
            </div>
            <div className="mt-6 text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} CrispNews. All rights reserved.
            </div>
          </div>
        </footer>
      );
};

export default Footer;