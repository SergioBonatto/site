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

export function DesktopNav() {
	const { colors } = useThemeContext();
	return (
		<div className="hidden md:flex flex-1 justify-center">
			<div className="flex gap-6 items-center">
				{links.slice(1).map((link) => (
					<a
						key={link.href}
						href={link.href}
						target={link.external ? "_blank" : undefined}
						rel={link.external ? "noopener noreferrer" : undefined}
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
