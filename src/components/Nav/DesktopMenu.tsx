"use client";

import React, { useRef, useState } from "react";
import NavItem from "./NavItem"; // Importe o componente NavItem

interface DesktopMenuProps {
    navItems: { name: string; href: string }[];
    isPlaying: boolean;
    handlePlayPause: () => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ navItems, isPlaying, handlePlayPause }) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    return (
        <nav>
            <ul className="hidden md:flex md:gap-8 mr-6">
                {navItems.map((item) => (
                    <NavItem key={item.name} name={item.name} href={item.href} />
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
