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
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
      </div>
    </Link>
  );
}
