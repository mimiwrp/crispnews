import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex-grow container mx-auto px-4 py-6">
                {children}
            </main>
            <Footer />
        </div> 
    );
};

export default Layout;