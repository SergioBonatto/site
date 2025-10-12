'use client';

import React from "react";
import { useThemeContext } from "../Theme/ThemeProvider";
import { ThemeToggle } from "../Theme/ThemeToggle";
import { LanguageToggle } from "../LanguageToggle";
import { useTranslation } from "@/i18n";

export function DesktopNav() {
	const { colors } = useThemeContext();
	const { t } = useTranslation();

	const links = [
		{ href: "/", label: t('nav.home') },
		{ href: "/blog", label: t('nav.blog') },
		{ href: "/#about", label: t('nav.about') },
		{ href: "/#projects", label: t('nav.projects') },
		{ href: "/experiencia", label: t('nav.experience') },
		{ href: "/login", label: t('nav.login') },
	];

	return (
		<div className="hidden md:flex flex-1 justify-center">
			<div className="flex gap-6 items-center">
				{links.slice(1).map((link) => (
					<a
						key={link.href}
						href={link.href}
						className="text-base font-medium px-3 py-1 rounded hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
						style={{ color: colors.mono1 }}
					>
						{link.label}
					</a>
				))}
				<ThemeToggle />
				<LanguageToggle />
			</div>
		</div>
	);
}
