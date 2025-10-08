"use client";
import React from "react";
import { useThemeContext } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
	{ href: "/", label: "Início" },
	{ href: "/blog", label: "Blog" },
	{ href: "https://github.com/SergioBonatto", label: "GitHub", external: true },
	{ href: "https://linkedin.com/in/sergiobonatto", label: "LinkedIn", external: true },
	{ href: "https://instagram.com/fibonatto", label: "Instagram", external: true },
];

export function Nav() {
	const { colors, theme } = useThemeContext();

	return (
		<nav
			className={cn(
				"w-full flex items-center justify-between px-6 py-3 sticky top-0 z-30",
				"backdrop-blur border-b",
			)}
			style={{
				background: colors.syntaxBg + (theme === "dark" ? "cc" : "ee"),
				borderColor: colors.vertsplit,
				color: colors.mono1,
			}}
		>
			<div className="flex items-center gap-6">
				<a
					href="/"
					className="font-bold text-lg tracking-tight hover:underline"
					style={{ color: colors.hue2 }}
				>
					Sergio Bonatto
				</a>
				{links.slice(1).map((link) => (
					<a
						key={link.href}
						href={link.href}
						target={link.external ? "_blank" : undefined}
						rel={link.external ? "noopener noreferrer" : undefined}
						className="text-base hover:underline"
						style={{ color: colors.mono1 }}
					>
						{link.label}
					</a>
				))}
			</div>
			<div className="flex items-center gap-2">
				<ThemeToggle />
			</div>
		</nav>
	);
}
