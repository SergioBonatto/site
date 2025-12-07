'use client';

import React from 'react';
import ProjectCard from './ProjectCard';
import { useThemeContext } from '@/components/Theme/ThemeProvider';
import { useTranslation } from '@/i18n/client';
import { useScrollAnimation } from '@/lib/useScrollAnimation';
import { cn } from '@/lib/utils';

const ProjectsSection: React.FC = () => {
	const { colors } = useThemeContext();
	const { t } = useTranslation();
	const { ref, isVisible } = useScrollAnimation<HTMLElement>();

	const projects = [
		{
			title: t('projects.phi.title'),
			description: t('projects.phi.description'),
			link: 'https://github.com/SergioBonatto/Phi',
			image: '/Phi.png',
		},
		{
			title: t('projects.treeson.title'),
			description: t('projects.treeson.description'),
			link: 'https://github.com/SergioBonatto/treeson',
			image: '/Treeson.png',
		},
		{
			title: t('projects.flowcash.title'),
			description: t('projects.flowcash.description'),
			link: 'https://github.com/SergioBonatto/FlowCash',
			image: '/Flowcash.png',
		},
		{
			title: t('projects.kind.title'),
			description: t('projects.kin	d.description'),
			link: 'https://sergiobonatto.github.io/Software-Foundations-in-Kind/docs/Kind-ptBR/index.html',
			image: '/Kind.png',
		},
		{
			title: t('projects.agdavim.title'),
			description: t('projects.agdavim.description'),
			link: 'https://github.com/SergioBonatto/Agda-vim',
			image: '/Agda.png',
		},
		{
			title: t('projects.agoriz.title'),
			description: t('projects.agoriz.description'),
			link: 'https://github.com/Agoriz',
			image: '/Agoriz.png',
		},
	];

	return (
		<section
			id="projects"
			ref={ref}
			className={cn(
				"w-full max-w-6xl mx-auto my-12 p-4 md:p-8 fade-in-section scroll-section",
				isVisible && "is-visible"
			)}
			style={{ backgroundColor: colors.syntaxBg, color: colors.mono1 }}
		>
			<h2
				className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
				style={{ color: colors.hue2 }}
			>
				{t('projects.title')}
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
				{projects.map((project, index) => (
					<div
						key={index}
						className={cn(
							"stagger-item",
							isVisible && "is-visible",
							`stagger-delay-${Math.min(index + 1, 6)}`
						)}
					>
						<ProjectCard project={project} />
					</div>
				))}
			</div>
		</section>
	);
};

export default ProjectsSection;
