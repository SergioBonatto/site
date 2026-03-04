'use client';

import { useRouter, usePathname } from 'next/navigation';
import { replaceLocaleInPath } from './locale';
import type { Locale } from '@/i18n/types';

export function useLocaleNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return (locale: Locale) => {
    const newPath = replaceLocaleInPath(pathname, locale);
    router.replace(newPath);
  };
}