import React from 'react';

interface NavItemProps {
    name: string;
    href: string;
    onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ name, href, onClick }) => (
    <li className="text-center">
        <a
            href={href}
            className="relative text-gray-900 hover:text-blue-800 transition-colors duration-200 group"
            onClick={onClick}
        >
            {name}
            <span className="absolute left-0 bottom-[-1.5rem] w-0 h-0.5 bg-blue-800 group-hover:w-full transition-all duration-300" />
        </a>
    </li>
);

export default NavItem;
