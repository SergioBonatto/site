import { useEffect, useState, useRef } from 'react';

function useDevTools() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const lastStateRef = useRef<boolean>(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Lightweight detection function
    const detect = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      const open = widthThreshold || heightThreshold;
      if (open !== lastStateRef.current) {
        lastStateRef.current = open;
        setIsDevToolsOpen(open);
      }
    };

    // Debounced wrapper to avoid flooding on pointer events
    const debounced = () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        detect();
      }, 120);
    };

    // Initial detection
    detect();

    // Listen to low-frequency events only
    window.addEventListener('resize', debounced, { passive: true });
    window.addEventListener('load', debounced, { passive: true });
    // pointermove is lower-level and better than mousemove for various input devices
    window.addEventListener('pointermove', debounced, { passive: true });

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      window.removeEventListener('resize', debounced);
      window.removeEventListener('load', debounced);
      window.removeEventListener('pointermove', debounced);
    };
  }, []);

  return isDevToolsOpen;
}

export default useDevTools;
