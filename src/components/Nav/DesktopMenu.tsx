"use client";

import React, { useRef } from "react";
import Link from "next/link";

interface DesktopMenuProps {
    navItems: { name: string; href: string }[];
    isPlaying: boolean;
    handlePlayPause: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ navItems, isPlaying, handlePlayPause }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    const handleLinkClick = (href: string) => {
        if (href === '/') {
            window.location.href = '/';
        }
    };

    return (
        <nav className="hidden md:flex items-center space-x-4 mr-6">
            <ul className="flex items-center space-x-4">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link
                            href={item.href}
                            className="text-gray-900 hover:text-blue-800"
                            scroll={item.href !== '/'}
                            onClick={() => handleLinkClick(item.href)}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
                <li className="text-center">
                    <button
                        onClick={handlePlayPause}
                        className="relative text-gray-900 hover:text-blue-800 transition-colors duration-200 group"
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                        <span className="absolute left-0 bottom-[-1.5rem] w-0 h-0.5 bg-blue-800 group-hover:w-full transition-all duration-300" />
                    </button>
                </li>
            </ul>
            <audio ref={audioRef} src="/music.mp3" loop />
        </nav>
    );
};

export default DesktopMenu;
