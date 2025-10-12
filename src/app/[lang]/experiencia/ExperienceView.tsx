'use client';
import React from 'react';
import styles from './experience.module.css';
import { experiences, skillCategories } from '@/data/experienceData';
import { useTranslation } from '@/i18n/client';

// This is a Client Component responsible for rendering the dynamic content
export default function ExperienceView() {
  const { t } = useTranslation();

  return (
    <main className={styles.mainContent}>
      {/* EXPERIÊNCIA */}
      <section className={styles.experienceGrid}>
        <div>
          <h2 className={styles.header}>{t('experience.title')}</h2>
          <p className={styles.sectionDescription}>
            {t('experience.description')}
          </p>
        </div>

        {experiences.map((exp, index) => (
          <div key={index} className={styles.experienceCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{t(`experience.${exp.id}.title`)}</h3>
              <div className={styles.cardCompany}>{exp.company}</div>
            </div>

            <div className={styles.cardMeta}>
              <span className={styles.cardPeriod}>{t(`experience.${exp.id}.period`)}</span>
              <span className={styles.cardLocation}>{t(`experience.${exp.id}.location`)}</span>
            </div>

            <p className={styles.cardDescription}>{t(`experience.${exp.id}.description`)}</p>

            <div className={styles.cardHighlights}>
              {exp.highlights.map((highlight, idx) => (
                <span key={idx} className={styles.highlightTag}>
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* HABILIDADES */}
      <section className={styles.skillsSection}>
        <div>
          <h2 className={styles.header}>{t('experience.skills.title')}</h2>
          <p className={styles.sectionDescription}>
            {t('experience.skills.description')}
          </p>
        </div>

        <div className={styles.skillsGrid}>
          {skillCategories.map((category, index) => (
            <div key={index} className={styles.skillCategory}>
              <h3 className={styles.categoryLabel}>{t(`skills.${category.id}.label`)}</h3>
              <div className={styles.skillTags}>
                {category.items.map((item, idx) => (
                  <span key={idx} className={styles.skillTag}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FORMAÇÃO */}
      <section className={styles.educationSection}>
        <div>
          <h2 className={styles.header}>{t('experience.education.title')}</h2>
          <p className={styles.sectionDescription}>
            {t('experience.education.description')}
          </p>
        </div>

        <div className={styles.educationCard}>
          <h3 className={styles.educationTitle}>
            {t('experience.education.autodidact')}
          </h3>
          <div className={styles.educationSubtitle}>
            {t('experience.education.subtitle')}
          </div>
          <p className={styles.educationDescription}>
            {t('experience.education.details')}
          </p>
        </div>
      </section>
    </main>
  );
}