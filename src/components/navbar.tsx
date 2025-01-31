"use client"

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
    name: string;
    href: string;
}

const navItems: NavItem[] = [
    { name: 'Home',         href: '#home' },
    { name: 'About',        href: '#about' },
    { name: 'Contact',      href: '#Contact' },
    { name: 'Blog',         href: '#Blog' },
    { name: 'Portfolio',    href: '#Portfolio' }
];

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-10 left-0 w-full border border-gray-300 flex z-50 bg-gray-200 ${isScrolled ? 'shadow-lg' : ''
                } retro-border`}
        >
            <nav className="w-screen h-16 flex items-center justify-between bg-gray-200 relative">
                {/* Logo */}
                <a href="#" className="font-bold text-2xl text-gray-900 ml-6">
                    <span className="text-blue-800">Bonatto</span>
                </a>

                {/* Desktop Menu */}
                <ul className="hidden md:flex md:gap-8 mr-6">
                    {navItems.map((item) => (
                        <li key={item.name} className="text-center">
                            <a
                                href={item.href}
                                className="relative text-gray-900 hover:text-blue-800 transition-colors duration-200 group"
                            >
                                {item.name}
                                <span className="absolute left-0 bottom-[-1.5rem] w-0 h-0.5 bg-blue-800 group-hover:w-full transition-all duration-300" />
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden ${isMenuOpen
                        ? 'fixed inset-0 bg-gray-200 z-50'
                        : 'hidden'
                        }`}
                >
                    <ul className="h-full grid place-content-center gap-16">
                        {navItems.map((item) => (
                            <li key={item.name} className="text-center">
                                <a
                                    href={item.href}
                                    className="text-gray-900 hover:text-blue-800 transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Toggle Buttons */}
                <div className="md:hidden mr-6">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className={`absolute right-6 top-5 text-blue-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0 invisible -top-6' : 'opacity-100 visible'
                            }`}
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className={`absolute right-6 text-blue-800 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible top-5' : 'opacity-0 invisible -top-6'
                            }`}
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
