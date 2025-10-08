import React from 'react';
import ProjectCard from './ProjectCard';
import { useThemeContext } from '@/components/Theme/ThemeProvider';

const projects = [
	{
		title: 'Phi - A Pure Lambda Calculus Interpreter',
		description:
			'Phi is a sophisticated interpreter for pure lambda calculus, implemented in Haskell. It provides an elegant and powerful environment for exploring lambda calculus expressions, making it ideal for educational purposes and theoretical computer science research.',
		link: 'https://github.com/SergioBonatto/Phi',
		image: '/Phi.png',
	},
	{
		title: 'Treeson',
		description:
			'Treeson is a command-line tool that converts directory structures and GitHub repositories into JSON format. Perfect for documentation, analysis, and tooling purposes.',
		link: 'https://github.com/SergioBonatto/treeson',
		image: '/Treeson.png',
	},
	{
		title: 'FlowCash',
		description:
			'a modern and elegant personal finance management app built with React Native and Expo. Designed with a premium glassmorphism-inspired UI and fully offline architecture, it empowers users to track, analyze, and manage their daily finances securely and intuitively.',
		link: 'https://github.com/SergioBonatto/FlowCash',
		image: '/Flowcash.png',
	},
	{
		title: 'Softwares Foundations in Kind (pt-BR)',
		description:
			'A translation of the book "Software Foundations in Idris" into Portuguese, using the Kind programming language. This project was developed in collaboration with Savio for the Higher Order Company.',
		link: 'https://sergiobonatto.github.io/Software-Foundations-in-Kind/docs/Kind-ptBR/index.html',
		image: '/Kind.png',
	},
	{
		title: 'Agda-vim',
		description:
			'A comprehensive Vim plugin that adds full syntax highlighting support for Agda files, including keywords, types, operators, Unicode symbols, and convenient keyboard shortcuts for mathematical notation (λ, →, ∀, ≡).',
		link: 'https://github.com/SergioBonatto/Agda-vim',
		image: '/Agda.png',
	},
	{
		title: 'Agoriz',
		description:
			'Agoriz is a project aimed at bringing Web3 payments to enterprises. It is designed to simplify, scale, and secure blockchain-based transactions, enabling businesses to integrate digital assets and programmable finance into their daily operations.',
		link: 'https://agoriz.vercel.app',
		image: '/Agoriz.png',
	},
];

const ProjectsSection: React.FC = () => {
	const { colors } = useThemeContext();

	return (
		<section
			id="projects"
			className="w-full max-w-6xl mx-auto my-12 p-4 md:p-8"
			style={{ backgroundColor: colors.syntaxBg, color: colors.mono1 }}
		>
			<h2
				className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
				style={{ color: colors.hue2 }}
			>
				Projects
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{projects.map((project, index) => (
					<ProjectCard key={index} project={project} />
				))}
			</div>
		</section>
	);
};

export default ProjectsSection;
