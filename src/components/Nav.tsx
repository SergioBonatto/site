"use client";


import React, { useState } from "react";
import { useThemeContext } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Nav() {
  const { colors, theme } = useThemeContext();
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
        <a
          href="/"
          className="font-bold text-3xl md:text-3xl tracking-tight mt-1 pl-4"
          style={{ color: colors.hue2 }}
        >
          Bonatto
        </a>

        <div className="links">
        {/* Links centralizados (desktop) */}
        <DesktopNav />

        {/* Theme toggle sempre à direita */}
        <div className="flex items-center gap-2">
        </div>

        </div>
      </div>

      {/* Menu mobile cobrindo toda a tela */}
      <MobileNav
        open={mobileOpen}
        onOpen={() => setMobileOpen(true)}
        onClose={() => setMobileOpen(false)}
      />
    </nav>
  );
}
