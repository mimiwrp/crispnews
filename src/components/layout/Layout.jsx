import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      <main className="flex-grow container mx-auto py-6 px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;