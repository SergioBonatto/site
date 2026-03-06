'use client';

import React, { useEffect, useState } from 'react';
import { useThemeContext } from '../Theme/ThemeProvider';
import { cn } from '@/lib/utils';
import Walker from '../gb';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const { colors } = useThemeContext();
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer
      className={cn(
        "w-full py-6 items-center flex flex-col items-center justify-between ",
        className
      )}
      style={{
        backgroundColor: colors.syntaxBg,
        color: colors.mono2,
      }}
    >
      < Walker />
      <div className="container mx-auto px-2">
        <div className="flex flex-col items-center justify-between gap-4">
          {/* Branding and Copyright */}
          <div className="flex items-center md:items-start gap-3">
            <div className="text-sm flex items-center gap-2">
              <span>© {currentYear}</span>
              <span style={{ color: colors.mono3 }}>•</span>
              <span>[Bonatto]</span>
              <span style={{ color: colors.mono3 }}>•</span>
              <span>Vim powered</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
