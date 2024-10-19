import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white text-center py-4 mt-8">
            <p>
                &copy; {currentYear} <a href='' className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Priyanka</a>. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
