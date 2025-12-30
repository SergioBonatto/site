'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/i18n/I18nProvider';
import { Nav } from '@/components/Nav/Nav';
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer';
import styles from './yuu.module.css';
import Image from 'next/image';

export default function YuuPage() {
  const { t, language } = useI18n();
  const [showCat, setShowCat] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkMobile();

    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNo = () => {
    // Redirect to a non-existent page to trigger 404
    router.push(`/${language}/this-page-does-not-exist-yuu-only`);
  };

  const handleYes = () => {
    setShowPassword(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === 'brapao') {
      setShowCat(true);
      setShowPassword(false);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {showCat && (
        <div className={styles.catBackground}>
          <Image
            src={isMobile ? '/cat-mobile.jpg' : '/cat.jpg'}
            alt="Cat background"
            fill
            priority
            quality={100}
            className={styles.catImage}
          />
        </div>
      )}
      <Nav />
      <main className={styles.main}>
        {!showCat && !showPassword && (
          <div className={styles.container}>
            <h1 className={styles.question}>{t('yuu.question')}</h1>
            <div className={styles.buttonContainer}>
              <button className={`${styles.button} ${styles.yes}`} onClick={handleYes}>
                {t('yuu.yes')}
              </button>
              <button className={`${styles.button} ${styles.no}`} onClick={handleNo}>
                {t('yuu.no')}
              </button>
            </div>
          </div>
        )}
        {showPassword && !showCat && (
          <div className={styles.container}>
            <h1 className={styles.question}>Digite a senha 🔐</h1>
            <form onSubmit={handlePasswordSubmit} className={styles.passwordForm}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.passwordInput}
                placeholder="••••••"
                autoFocus
              />
              <button type="submit" className={`${styles.button} ${styles.yes}`}>
                Confirmar
              </button>
              {error && <p className={styles.error}>Senha incorreta! Tente novamente.</p>}
            </form>
          </div>
        )}
        {showCat && (
          <div className={styles.messageContainer}>
            <p className={styles.message}>{t('yuu.message')}</p>
          </div>
        )}
      </main>
      {showCat && (
        <div className={styles.playerWrapper}>
          <AudioPlayer src="/music.mp3" />
        </div>
      )}
    </div>
  );
}
