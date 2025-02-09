import React from 'react';
import Link from 'next/link';


interface MobileMenuProps {
    navItems: { name: string; href: string }[];
    isPlaying: boolean;
    handlePlayPause: () => void;
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, isPlaying, handlePlayPause, isMenuOpen, setIsMenuOpen }) => (
    <div className={`md:hidden ${isMenuOpen ? 'fixed inset-0 bg-gray-200 z-50' : 'hidden'}`}>
        <div className="relative w-full h-full">
            {/* Botão de fechar */}
            <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 text-gray-900 p-2"
            >
                ✕
            </button>

            <ul className="h-full grid place-content-center gap-16">
                {navItems.map((item) => (
                    <li key={item.name} className="text-center">
                        <Link
                            href={item.href}
                            className="text-xl text-gray-900 hover:text-blue-800 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
                <li className="text-center">
                    <button
                        onClick={handlePlayPause}
                        className="text-xl text-gray-900 hover:text-blue-800 transition-colors duration-200"
                    >
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                </li>
            </ul>
        </div>
    </div>
);

export default MobileMenu;
