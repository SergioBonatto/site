import { useEffect, useState, useRef, useCallback } from 'react';

// Standard Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
const DEFAULT_KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

/**
 * Custom hook that detects when the Konami code is typed
 * @param {Function} onActivate - Function to be executed when the code is activated
 * @param {string[]} code - The code to detect (optional, uses the default Konami code if not specified)
 * @returns {[boolean, () => void]} - Whether the code is activated or not and a function to reset
 */
export default function useKonamiCode(
  onActivate?: () => void,
  code: string[] = DEFAULT_KONAMI_CODE
): [boolean, () => void] {
  const [activated, setActivated] = useState(false);
  const keypressArray = useRef<string[]>([]);

  // Function to reset the state
  const reset = useCallback(() => {
    setActivated(false);
    keypressArray.current = [];
  }, []);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (activated) return; // Does not detect more sequences if already activated

      // Adds the key to the array
      keypressArray.current = [...keypressArray.current, e.key.toLowerCase()];

      // Keeps only the last N keys (where N is the code length)
      if (keypressArray.current.length > code.length) {
        keypressArray.current = keypressArray.current.slice(
          keypressArray.current.length - code.length
        );
      }

      // Checks if the code was typed
      const codeMatches = keypressArray.current.every((key, index) => {
        return key === code[index].toLowerCase();
      });

      if (codeMatches && keypressArray.current.length === code.length) {
        setActivated(true);
        if (onActivate) {
          onActivate();
        }
      }
    };

    window.addEventListener('keydown', keyHandler);

    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [code, onActivate, activated]);

  return [activated, reset];
}
