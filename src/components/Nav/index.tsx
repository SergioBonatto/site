"use client"

import React, { useState, useEffect } from 'react';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import ToggleButtons from './ToggleButtons';
import MusicPlayer from '../musicPlayer';
import Link from 'next/link';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#Contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Portfolio', href: '/#Portfolio' },
    { name: 'Login', href: '/login' },
    {   name: 'KindBook',
        href: 'https://sergiobonatto.github.io/Software-Foundations-in-Kind/docs/Kind/index.html',
        target: '_blank',
        rel:"noopener noreferrer",
    }
];

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handlePlayPause = () => {
        const audioElement = document.querySelector('audio');
        if (audioElement) {
            if (audioElement.paused) {
                audioElement.play();
                setIsPlaying(true);
            } else {
                audioElement.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <header className={`fixed top-5 left-0 w-full border border-gray-300 flex z-50 bg-gray-200 ${isScrolled ? 'shadow-lg' : ''} retro-border`}>
            <nav className="w-screen h-16 flex items-center justify-between bg-gray-200 relative">
            <Link href="/" className="font-bold text-2xl text-gray-900 ml-6">
            <span className="text-blue-800">Bonatto</span>
            </Link>
                <DesktopMenu navItems={navItems} isPlaying={isPlaying} handlePlayPause={handlePlayPause} />
                <MobileMenu navItems={navItems} isPlaying={isPlaying} handlePlayPause={handlePlayPause} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <ToggleButtons isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            </nav>
            <MusicPlayer />
        </header>
    );
};

export default Navbar;
