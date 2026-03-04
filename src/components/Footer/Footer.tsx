'use client';

import React, { useEffect, useState } from 'react';
import SocialLinks from './SocialLinks';
import { useThemeContext } from '../Theme/ThemeProvider';
import { useTranslation } from '@/i18n/client';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer
      className={cn(
        "w-full py-10 transition-colors duration-300",
        className
      )}
      style={{
        backgroundColor: colors.syntaxBg,
        color: colors.mono2,
      }}
    >
      <div className="container mx-auto px-2">
        <div className="flex flex-col  items-center justify-between gap-4">
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
