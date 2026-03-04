'use client';

import { useState, useRef } from 'react';
import { useLanguage } from '@/i18n/I18nProvider';
import { useLocaleNavigation } from '@/lib/useLocaleNavigation';
import { locales, maxLocaleLength, localeWidthCh } from '@/i18n/types';

export function LanguageToggle() {
  const { language } = useLanguage();
  const navigate = useLocaleNavigation();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative font-mono text-md">
      <button
        onClick={() => setOpen(v => !v)}
        style={{ minWidth: `${maxLocaleLength + 1}ch` }}
        className="
          px-3 py-1.5
          tracking-wide
          whitespace-nowrap
          text-center
          opacity-70 hover:opacity-100
          transition-opacity
        "
      >
        {language}
        <span className="ml-1 opacity-50">▾</span>
      </button>

      {open && (
        <div
          style={{ width: `${localeWidthCh}ch` }}
          className="
            absolute right-0 mt-2
            border border-neutral-800
          "
        >         
          {locales.map((locale) => {
            const active = locale === language;

            return (
              <button
                key={locale}
                onClick={() => {
                  navigate(locale);
                  setOpen(false);
                }}
                className={`
                  block w-full text-left px-3 py-1.5
                  tracking-wide
                  ${active
                    ? 'font-semibold'
                    : 'opacity-60 hover:opacity-100'}
                `}
                aria-current={active ? 'true' : undefined}
              >
                {locale}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}