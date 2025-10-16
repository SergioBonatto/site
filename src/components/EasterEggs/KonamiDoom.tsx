import { useState, useRef, useEffect } from 'react';
import styles from './KonamiDoom.module.css';
import useKonamiCode from '@/lib/useKonamiCode';
import { ClientOnly } from '../Core/ClientOnly';
import { useTranslation } from '@/i18n/client';

export default function KonamiDoom() {
  const { t } = useTranslation();
  const [showGame, setShowGame] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gameQuality, setGameQuality] = useState('medium'); // 'low', 'medium', 'high'
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const preloadRef = useRef<boolean>(false);

  // Preloading the game in the background after a few seconds of page loading
  useEffect(() => {
    // Only load the iframe once
    if (preloadRef.current) return;

    // Start preloading after the page is completely loaded
    const timer = setTimeout(() => {
      preloadRef.current = true;
      const preloadIframe = document.createElement('iframe');
      preloadIframe.style.display = 'none';
      preloadIframe.src = "https://archive.org/embed/doom-play";
      preloadIframe.onload = () => {
        // Remove the preloading iframe after loading
        document.body.removeChild(preloadIframe);
      };
      document.body.appendChild(preloadIframe);
    }, 5000); // Wait 5 seconds after page load to start preloading

    return () => clearTimeout(timer);
  }, []);

  // Uses the custom hook to detect the Konami code
  const [konamiActivated, resetKonami] = useKonamiCode(() => {
    // Disable scroll
    document.body.style.overflow = 'hidden';

    // Show the game after a small animation
    setTimeout(() => {
      setShowGame(true);
      // Start loading the game (if not already preloaded)
      setIsLoading(true);
    }, 800);
  });

  // Close the game
  const closeGame = () => {
    setShowGame(false);

    // Re-enable scroll
    document.body.style.overflow = '';

    setTimeout(() => {
      resetKonami(); // Reset the Konami code state
    }, 500);
  };

  // Handles the iframe loading event
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // Adjusts the game quality
  const changeQuality = (quality: string) => {
    setGameQuality(quality);

    // Apply specific configurations to the game iframe
    if (iframeRef.current) {
      // Communicate with the iframe using messages to adjust quality
      // (This depends on the support in the Internet Archive embed)
      try {
        iframeRef.current.contentWindow?.postMessage({
          action: 'setQuality',
          quality: quality
        }, '*');
      } catch (e) {
        console.log('Unable to adjust game quality, error?', e);
      }
    }
  };

  if (!konamiActivated) return null;

  return (
    <ClientOnly>
      <div className={styles.konamiContainer}>
        {showGame ? (
          <div className={styles.gameModal}>
            <div className={styles.gameHeader}>
              <h3>{t('konamiDoom.title')}</h3>
              <div className={styles.gameControls}>
                <div className={styles.qualitySelector}>
                  <button
                    className={`${styles.qualityButton} ${gameQuality === 'low' ? styles.active : ''}`}
                    onClick={() => changeQuality('low')}
                    title={t('konamiDoom.quality.low')}
                  >
                    {t('konamiDoom.quality.low')}
                  </button>
                  <button
                    className={`${styles.qualityButton} ${gameQuality === 'medium' ? styles.active : ''}`}
                    onClick={() => changeQuality('medium')}
                    title={t('konamiDoom.quality.medium')}
                  >
                    {t('konamiDoom.quality.medium')}
                  </button>
                  <button
                    className={`${styles.qualityButton} ${gameQuality === 'high' ? styles.active : ''}`}
                    onClick={() => changeQuality('high')}
                    title={t('konamiDoom.quality.high')}
                  >
                    {t('konamiDoom.quality.high')}
                  </button>
                </div>
                <button
                  onClick={closeGame}
                  className={styles.closeButton}
                  aria-label={t('konamiDoom.close')}
                >
                  ×
                </button>
              </div>
            </div>
            <div className={styles.doomContainer}>
              {isLoading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.loadingSpinner}></div>
                  <p>{t('konamiDoom.loading')}</p>
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={`https://archive.org/embed/doom-play?${new URLSearchParams({
                  quality: gameQuality,
                  autoplay: "1",
                  cache: "1"
                }).toString()}`}
                width="100%"
                height="100%"
                style={{
                  border: 'none',
                  visibility: isLoading ? 'hidden' : 'visible'
                }}
                allow="autoplay; fullscreen"
                title={t('konamiDoom.title')}
                onLoad={handleIframeLoad}
                loading="eager"
              />
            </div>
            <div className={styles.gameInstructions}>
              <p>{t('konamiDoom.controls')}</p>
              <p>
                <strong>{t('konamiDoom.performanceTip')}</strong>
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.konamiMessage}>
            <h2>{t('konamiDoom.activated')}</h2>
            <p>{t('konamiDoom.preparing')}</p>
            <div className={styles.loadingDots}></div>
          </div>
        )}
      </div>
    </ClientOnly>
  );
}
