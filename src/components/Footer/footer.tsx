'use client';

import React, { useEffect } from 'react';

const updateFooterYear = () => {
  const yearElement = document.getElementById('footer-year');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `Bonatto™ ${currentYear}`;
  }
};

const Footer: React.FC = () => {
  useEffect(() => {
    updateFooterYear();
  }, []);

  return (
    <footer className={`left-0 w-full border border-gray-300 flex z-50 bg-gray-200 retro-border p-5 mt-5`}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Brand Section */}
        <div className="brand">
          <a href="#home" className="text-3xl font-bold text-[#000080]">
            <span>Bonatto</span>
          </a>
          <p id="footer-year" className="text-md mt-2">Bonatto&trade; 2025</p>
          <p className="text-sm">All rights reserved.</p>
        </div>

        {/* Social Section */}
        <div className="social grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 md:mt-7 text-md">
          <a href="https://www.instagram.com/Sergio_Bonatto/" target="_blank" className="text-[#000080]">
            Instagram
          </a>
          <a href="https://github.com/SergioBonatto/" target="_blank" className="text-[#000080]">
            Github
          </a>
          <a href="https://x.com/fiBonatto" target="_blank" className="text-[#000080]">
            X
          </a>
          <a href="https://www.linkedin.com/in/sergiobonatto/" target="_blank" className="text-[#000080]">
            Linkedin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
