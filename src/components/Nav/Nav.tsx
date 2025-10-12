"use client";


import React, { useState } from "react";
import { useThemeContext } from "../Theme/ThemeProvider";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { useLanguage } from "@/i18n/client";
import Link from 'next/link';

export function Nav() {
  const { colors, theme } = useThemeContext();
  const { language } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={cn(
        "w-full sticky top-6 z-30 backdrop-blur border-b transition-colors duration-300 mt-4"
      )}
      style={{
        background: colors.syntaxBg + (theme === "dark" ? "cc" : "ee"),
        borderColor: colors.vertsplit,
        color: colors.mono1,
      }}
    >
      <div className="mx-auto flex items-center justify-between px-8 py-4 md:py-2">
        {/* Logo */}
        <Link
          href={`/${language}`}
          className="font-bold text-3xl md:text-3xl tracking-tight mt-1 pl-4"
          style={{ color: colors.hue2 }}
        >
          Bonatto
        </Link>

        <div className="links">
          <DesktopNav />
        </div>
      </div>

      {/* Fullscreen mobile menu */}
      <MobileNav
        open={mobileOpen}
        onOpen={() => setMobileOpen(true)}
        onClose={() => setMobileOpen(false)}
      />
    </nav>
  );
}
