'use client';

import React from "react";
import Link from "next/link";
import { useThemeContext } from "../Theme/ThemeProvider";
import { ThemeToggle } from "../Theme/ThemeToggle";
import { LanguageToggle } from "../LanguageToggle";
import { useTranslation, useLanguage } from "@/i18n/client";

export function DesktopNav() {
	const { colors } = useThemeContext();
	const { t } = useTranslation();
	const { language } = useLanguage();

	const links = [
		{ href: "/", label: t('nav.home'), isHash: false },
		{ href: "#about", label: t('nav.about'), isHash: true },
		{ href: "#projects", label: t('nav.projects'), isHash: true },
		// { href: "/experiencia", label: t('nav.experience'), isHash: false },
		{ href: "/blog", label: t('nav.blog'), isHash: false },
		{ href: "/login", label: t('nav.login'), isHash: false },
	];

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		// Check if it's a hash link
		if (href.startsWith('#')) {
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
	};

	return (
		<div className="hidden md:flex flex-1 justify-center">
			<div className="flex gap-6 items-center">
				{links.map((link) => {
					// Se for hash, usa Link para home com hash
					if (link.isHash) {
						return (
							<Link
								key={link.href}
								href={`/${language}${link.href}`}
								onClick={(e) => handleClick(e, link.href)}
								className="text-base font-medium px-3 py-1 rounded hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
								style={{ color: colors.mono1 }}
							>
								{link.label}
							</Link>
						);
					}

					// Para links normais, adiciona o idioma na URL
					const localizedHref = `/${language}${link.href}`;
					return (
						<Link
							key={link.href}
							href={localizedHref}
							className="text-base font-medium px-3 py-1 rounded hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
							style={{ color: colors.mono1 }}
						>
							{link.label}
						</Link>
					);
				})}
				<ThemeToggle />
				<LanguageToggle />
			</div>
		</div>
	);
}
