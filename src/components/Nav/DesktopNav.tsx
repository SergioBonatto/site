import React from "react";
import { useThemeContext } from "../Theme/ThemeProvider";
import { ThemeToggle } from "../Theme/ThemeToggle";

const links = [
	{ href: "/", label: "Início" },
	{ href: "/blog", label: "Blog" },
	{ href: "/#about", label: "About" },
	{ href: "/login", label: "Login" },

];

export function DesktopNav() {
	const { colors } = useThemeContext();
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
			</div>
		</div>
	);
}
