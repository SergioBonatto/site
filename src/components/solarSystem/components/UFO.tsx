import React from 'react';

interface UFOProps {
  isVisible: boolean;
  position: number;
  systemScale: number;
}

export const UFO: React.FC<UFOProps> = ({ isVisible, position, systemScale }) => (
  <div
    className={`absolute z-20 transition-all duration-1000 ease-in-out
      ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    style={{
      width: `${30 * systemScale}px`,
      height: `${15 * systemScale}px`,
      top: '50%',
      left: '50%',
      transform: `translate(calc(-50% + ${position}px), -50%)`,
    }}
  >
    <div
      className="absolute w-full h-1/2 bottom-0 rounded-full"
      style={{
        backgroundColor: '#303030',
        boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
      }}
    />
    <div
      className="absolute w-[60%] h-[60%] bottom-[40%] left-1/2 -translate-x-1/2 rounded-full"
      style={{
        backgroundColor: 'rgba(0, 255, 255, 0.3)',
        border: '2px solid #505050',
      }}
    />
    <div className="absolute w-full bottom-0 flex justify-around">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-[4px] h-[4px] rounded-full animate-pulse"
          style={{
            backgroundColor: 'rgba(0, 255, 255, 0.8)',
            boxShadow: '0 0 5px rgba(0, 255, 255, 0.8)',
          }}
        />
      ))}
    </div>
  </div>
);
