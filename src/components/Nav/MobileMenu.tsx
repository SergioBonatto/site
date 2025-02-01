import React from 'react';
import NavItem from './NavItem';

interface MobileMenuProps {
    navItems: { name: string; href: string }[];
    isPlaying: boolean;
    handlePlayPause: () => void;
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navItems, isPlaying, handlePlayPause, isMenuOpen, setIsMenuOpen }) => (
    <div className={`md:hidden ${isMenuOpen ? 'fixed inset-0 bg-gray-200 z-50' : 'hidden'}`}>
        <ul className="h-full grid place-content-center gap-16">
            {navItems.map((item) => (
                <NavItem key={item.name} name={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} />
            ))}
            <li className="text-center">
                <button
                    onClick={handlePlayPause}
                    className="text-gray-900 hover:text-blue-800 transition-colors duration-200"
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </li>
        </ul>
    </div>
);

export default MobileMenu;
