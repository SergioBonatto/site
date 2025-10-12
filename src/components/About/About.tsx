'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useThemeContext } from '../Theme/ThemeProvider';
import { useTranslation } from '@/i18n';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

interface AboutProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  imageSrc?: string;
}

const About: React.FC<AboutProps> = ({
  className,
  imageSrc = "/eu.jpeg",
  ...props
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className={cn(
        "w-full max-w-6xl mx-auto my-12 p-4 md:p-8 fade-in-section scroll-section",
        isVisible && "is-visible",
        className
      )}
      style={{
        backgroundColor: colors.syntaxBg,
        color: colors.mono1,
      }}
      {...props}
    >
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
        style={{ color: colors.hue2 }}
      >
        {t('about.title')}
      </h2>
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Left Panel - Image */}
        <div className="w-full md:w-1/3">
          <div className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageSrc}
              alt={t('about.imageAlt')}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Panel - Content */}
        <div className="w-full md:w-2/3 flex flex-col justify-center">


          <div className="space-y-4 text-base md:text-lg leading-relaxed">
            {[
              t('about.paragraph1'),
              t('about.paragraph2'),
              t('about.paragraph3'),
              t('about.paragraph4'),
              t('about.paragraph5'),
              t('about.paragraph6'),
            ].map((text, index) => (
              <p
                key={index}
                className={cn(
                  "stagger-item",
                  isVisible && "is-visible",
                  `stagger-delay-${index + 1}`
                )}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
