import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProjectCard.module.css';

interface Project {
  title: string;
  description: string;
  link: string;
  image: string;
}

// A generic, light grey SVG placeholder
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <rect width="${w}" height="${h}" fill="#e2e8f0" />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmer(500, 300))}`;

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.link}
      className={`block rounded-lg group ${styles.card}`}
      style={{ textDecoration: 'none' }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.cardImageWrapper}>
        <Image
          src={project.image}
          alt={project.title}
          className={styles.cardImage}
          width={500}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
      </div>
    </Link>
  );
}
