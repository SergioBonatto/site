import React from 'react';
import { Star } from '../types';

interface StarsProps {
  stars: Star[];
}

export const Stars: React.FC<StarsProps> = ({ stars }) => (
  <>
    {stars.map((star, index) => (
      <div
        key={`star-${index}`}
        className="absolute bg-white rounded-full"
        style={{
          width: `${star.size}px`,
          height: `${star.size}px`,
          left: `${star.x}%`,
          top: `${star.y}%`,
          opacity: star.opacity
        }}
      />
    ))}
  </>
);
