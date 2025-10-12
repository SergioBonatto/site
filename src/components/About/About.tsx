'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useThemeContext } from '../Theme/ThemeProvider';
import { useTranslation } from '@/i18n/client';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

interface AboutProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  imageSrc?: string;
}

const About: React.FC<AboutProps> = ({
  className,
  imageSrc = "/eu.webp",
  ...props
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  // Generate a tiny SVG placeholder and convert to base64 for Next/Image
  const toBase64 = (str: string) => {
    if (typeof window === 'undefined') {
      return Buffer.from(str).toString('base64');
    }
    return window.btoa(unescape(encodeURIComponent(str)));
  };

  const svgPlaceholder = `<?xml version='1.0' encoding='UTF-8'?>\n` +
    `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='24' viewBox='0 0 16 24' preserveAspectRatio='none'>` +
    `<rect width='100%' height='100%' fill='${colors.syntaxBg}' />` +
    `</svg>`;

  const blurDataURL = `data:image/svg+xml;base64,${toBase64(svgPlaceholder)}`;

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
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageSrc}
              alt={t('about.imageAlt')}
              width={600}
              height={800}
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              quality={75}
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="object-cover w-full h-auto"
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
