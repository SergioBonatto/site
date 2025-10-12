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
		{ href: "/#about", label: t('nav.about') },
		{ href: "/#projects", label: t('nav.projects') },
		{ href: "/experiencia", label: t('nav.experience') },
		{ href: "/blog", label: t('nav.blog') },
		{ href: "/login", label: t('nav.login') },
	];

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		// Check if it's a hash link on the same page
		if (href.startsWith('/#')) {
			e.preventDefault();
			const id = href.substring(2); // Remove '/#'
			const element = document.getElementById(id);
			if (element) {
				const offset = 100; // Account for sticky navbar
				const elementPosition = element.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - offset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		}
	};

	return (
		<div className="hidden md:flex flex-1 justify-center">
			<div className="flex gap-6 items-center">
				{links.map((link) => (
					<a
						key={link.href}
						href={link.href}
						onClick={(e) => handleClick(e, link.href)}
						className="text-base font-medium px-3 py-1 rounded hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
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
