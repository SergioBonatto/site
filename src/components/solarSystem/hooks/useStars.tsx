import { useMemo } from 'react';
import { Star } from '../types';

export const useStars = (count: number = 150): Star[] => {
  return useMemo(() =>
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3
    }))
  , [count]);
};
