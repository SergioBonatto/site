'use client';

import React from "react";
import Link from "next/link";
import { useThemeContext } from "../Theme/ThemeProvider";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../Theme/ThemeToggle";
import { LanguageToggle } from "../LanguageToggle";
import { useTranslation, useLanguage } from "@/i18n/client";

interface MobileNavProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function MobileNav({ open, onOpen, onClose }: MobileNavProps) {
  const { colors, theme } = useThemeContext();
  const { t } = useTranslation();
  const { language } = useLanguage();

  const links = [
    { href: "/", label: t('nav.home'), isHash: false },
    { href: "#about", label: t('nav.about'), isHash: true },
    { href: "#projects", label: t('nav.projects'), isHash: true },
    // { href: "/experiencia", label: t('nav.experience'), isHash: false },
    { href: "/blog", label: t('nav.blog'), isHash: false },
    { href: "/login", label: t('nav.login'), isHash: false },
    // Example external links (uncomment if needed)
    // { href: "https://github.com/SergioBonatto", label: "GitHub", external: true },
    // { href: "https://linkedin.com/in/sergiobonatto", label: "LinkedIn", external: true },
    // { href: "https://instagram.com/fibonatto", label: "Instagram", external: true },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isHash: boolean) => {
    // Check if it's a hash link
    if (isHash) {
      const id = href.substring(1); // Remove '#'
      const element = document.getElementById(id);

      // Se o elemento existe na página atual, faz scroll suave
      if (element) {
        e.preventDefault();
        const offset = 100; // Account for sticky navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      // Se não existe, deixa o link navegar normalmente para a home com hash
    }
    onClose(); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Animated hamburger button */}
      <button
        className="fixed top-4 right-4 p-2 rounded-lg focus:outline-none focus:ring-2 z-[10001] md:hidden transition-all duration-200"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={open ? onClose : onOpen}
        style={{ color: colors.mono1 }}
      >
        <div className="w-6 h-5 relative flex flex-col justify-center">
          {/* Top line */}
          <span
            className="absolute block w-full h-0.5 rounded-full transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: colors.mono1,
              top: open ? '50%' : '0%',
              transform: open
                ? 'translateY(-50%) rotate(45deg)'
                : 'translateY(0) rotate(0)',
            }}
          />

          {/* Middle line */}
          <span
            className="absolute block w-full h-0.5 rounded-full transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: colors.mono1,
              top: '50%',
              transform: open
                ? 'translateY(-50%) scaleX(0)'
                : 'translateY(-50%) scaleX(1)',
              opacity: open ? 0 : 1,
            }}
          />

          {/* Bottom line */}
          <span
            className="absolute block w-full h-0.5 rounded-full transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: colors.mono1,
              top: open ? '50%' : '100%',
              transform: open
                ? 'translateY(-50%) rotate(-45deg)'
                : 'translateY(-100%) rotate(0)',
            }}
          />
        </div>
      </button>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed left-0 z-[9999] flex flex-col items-center justify-center transition-all duration-300 md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{
          background: colors.syntaxBg + (theme === "dark" ? "f6" : "fc"),
          color: colors.mono1,
          width: "100vw",
          height: "110vh",
          top: "-6rem"
        }}
        aria-modal="true"
        role="dialog"
      >
        <nav className="w-full max-w-md px-8">
          <ul className="w-full flex flex-col items-stretch gap-4">
            {links.map((link, index) => (
              <li
                key={link.href}
                className={cn(
                  "w-full text-center transition-all duration-300",
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{
                  transitionDelay: open ? `${index * 50}ms` : '0ms'
                }}
              >
                {link.isHash ? (
                  <Link
                    href={`/${language}${link.href}`}
                    className="block text-xl font-medium py-4 px-6 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ color: colors.mono1 }}
                    onClick={(e) => handleClick(e, link.href, link.isHash)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    href={`/${language}${link.href}`}
                    className="block text-xl font-medium py-4 px-6 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ color: colors.mono1 }}
                    onClick={() => onClose()}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

        </nav>
        <div className="flex gap-4 mt-6">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </>
  );
}
