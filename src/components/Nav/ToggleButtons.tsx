import React from 'react';
import { Menu, X } from 'lucide-react';

interface ToggleButtonsProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
}

const ToggleButtons: React.FC<ToggleButtonsProps> = ({ isMenuOpen, setIsMenuOpen }) => (
    <div className="md:hidden mr-6">
        <button
            onClick={() => setIsMenuOpen(true)}
            className={`absolute right-6 top-5 text-blue-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0 invisible -top-6' : 'opacity-100 visible'}`}
            aria-label="Open menu"
        >
            <Menu size={24} />
        </button>

        <button
            onClick={() => setIsMenuOpen(false)}
            className={`absolute right-6 text-blue-800 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible top-5' : 'opacity-0 invisible -top-6'}`}
            aria-label="Close menu"
        >
            <X size={24} />
        </button>
    </div>
);

export default ToggleButtons;
