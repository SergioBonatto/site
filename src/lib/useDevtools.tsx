import { useEffect, useState } from 'react';

function useDevTools() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    const detectDevTools = () => {
      setIsDevToolsOpen(false);
      // Method 1: Dimension difference
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;

      // Method 2: Console debug
      const isDevToolsOpen = /./;
      isDevToolsOpen.toString = () => {
        setIsDevToolsOpen(true);
        return '';
      };
      console.debug(isDevToolsOpen);

      if (widthThreshold || heightThreshold) {
        setIsDevToolsOpen(true);
      }
    };

    // Run detection on multiple events
    window.addEventListener('resize', detectDevTools);
    window.addEventListener('load', detectDevTools);
    window.addEventListener('mousemove', detectDevTools);

    // Initial check
    detectDevTools();

    return () => {
      window.removeEventListener('resize', detectDevTools);
      window.removeEventListener('load', detectDevTools);
      window.removeEventListener('mousemove', detectDevTools);
    };
  }, []);

  return isDevToolsOpen;
}

export default useDevTools;
