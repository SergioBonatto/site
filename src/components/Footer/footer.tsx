'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SocialLinks from './SocialLinks';

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bottom-0 left-0 w-full bg-[#c0c0c0] border-t-2 border-white border-l-2 border-r-2 border-b-0 border-solid shadow-[3px_3px_0_0_\\#808080]">
      <div className="container mx-auto px-4 py-2">
        {/* Desktop Version */}
        <div className="hidden sm:flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link
              href="/#"
              className="flex items-center bg-[#c0c0c0] border-2 border-white border-l-[#808080] border-t-[#808080] border-r-white border-b-white px-2 py-1 cursor-pointer hover:bg-[#a0a0a0] active:border-[#808080] active:border-l-white active:border-t-white"
            >
              <Image
                src="/pcgrey.png"
                alt="Start"
                className="mr-2 w-6 h-6"
                width={24}
                height={24}
              />
              <span className="font-bold text-black">Start</span>
            </Link>
            <div className="text-xs text-black">
              Bonatto™ {currentYear}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <SocialLinks />
            <div
              className={
                "bg-[#c0c0c0] border-2 border-white border-l-[#808080] " +
                "border-t-[#808080] border-r-white border-b-white px-2 py-1"
              }
            >
              {currentTime}
            </div>
          </div>
        </div>

        {/* Mobile Version */}
        <div className="sm:hidden flex flex-col">
          {/* Linha 1: Start à esquerda e ícones à direita */}
          <div className="flex items-center justify-between">
            <Link
              href="/#"
              className="flex items-center bg-[#c0c0c0] border-2 border-white border-l-[#808080] border-t-[#808080] border-r-white border-b-white px-2 py-1 cursor-pointer hover:bg-[#a0a0a0] active:border-[#808080] active:border-l-white active:border-t-white"
            >
              <Image
                src="/pcgrey.png"
                alt="Start"
                className="mr-2 w-6 h-6"
                width={24}
                height={24}
              />
              <span className="font-bold text-black">Start</span>
            </Link>
            <div className="flex items-center space-x-4">
              <SocialLinks />
            </div>
          </div>
          {/* Linha 2: Trademark à esquerda e relógio à direita */}
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-black">
              Bonatto™ {currentYear}
            </div>
            <div
              className={
                "bg-[#c0c0c0] border-2 border-white border-l-[#808080] " +
                "border-t-[#808080] border-r-white border-b-white px-2 py-1"
              }
            >
              {currentTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
