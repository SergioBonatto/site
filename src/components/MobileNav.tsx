import React from "react";
import { useThemeContext } from "./ThemeProvider";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/", label: "Início" },
  { href: "/blog", label: "Blog" },
  { href: "https://github.com/SergioBonatto", label: "GitHub", external: true },
  { href: "https://linkedin.com/in/sergiobonatto", label: "LinkedIn", external: true },
  { href: "https://instagram.com/fibonatto", label: "Instagram", external: true },
];

interface MobileNavProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export function MobileNav({ open, onOpen, onClose }: MobileNavProps) {
  const { colors, theme } = useThemeContext();

  return (
    <>
      {/* Botão hambúrguer animado */}
      <button
        className="fixed top-4 right-4 p-2 rounded-lg focus:outline-none focus:ring-2 z-[10001] md:hidden transition-all duration-200 hover:bg-opacity-10 hover:bg-current"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={open ? onClose : onOpen}
        style={{ color: colors.mono1 }}
      >
        <div className="w-6 h-5 relative flex flex-col justify-center">
          {/* Linha superior */}
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

          {/* Linha do meio */}
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

          {/* Linha inferior */}
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

      {/* Menu mobile */}
      <div
        className={cn(
          "fixed top-0 left-0 z-[9999] flex flex-col items-center justify-center transition-all duration-300 md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{
          background: colors.syntaxBg + (theme === "dark" ? "f6" : "fc"),
          color: colors.mono1,
          width: "100vw",
          height: "100vh",
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
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="block text-xl font-medium py-4 px-6 rounded-lg transition-all duration-200 hover:bg-opacity-10 hover:bg-current hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ color: colors.mono1 }}
                  onClick={onClose}
                >
                  {link.label}
                </a>

              </li>
            ))}
          </ul>

        </nav>
        <ThemeToggle />
      </div>
    </>
  );
}
