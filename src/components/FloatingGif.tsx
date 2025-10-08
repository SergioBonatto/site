"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useThemeContext } from './ThemeProvider';

const gifUrl = '/shigure-ui-smol.gif';

const FloatingGif: React.FC = () => {
  const { theme, requestThemeChange } = useThemeContext();
  const [visible, setVisible] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const [pendingTheme, setPendingTheme] = useState<null | string>(null);
  const [gifKey, setGifKey] = useState(0); // key para forçar remount
  const prevTheme = useRef(theme);
  const timeouts = useRef<{show?: NodeJS.Timeout, change?: NodeJS.Timeout}>({});

  // Função para iniciar o fluxo: exibe gif, troca tema após 1.5s, some após 2s
  const startThemeChangeWithGif = (newTheme: string) => {
    // Limpa timeouts antigos
    if (timeouts.current.change) clearTimeout(timeouts.current.change);
    if (timeouts.current.show) clearTimeout(timeouts.current.show);

    // Reseta animação se já estiver visível/expandindo
    setExpanding(false);
    setVisible(false);
    // Força remount do gif
    setGifKey(prev => prev + 1);

    // Aguarda o reset visual antes de iniciar nova animação
    setTimeout(() => {
      setPendingTheme(newTheme);
      setVisible(true);
      setTimeout(() => setExpanding(true), 30); // Pequeno delay para garantir transição
      // Troca o tema após 1.5s
      timeouts.current.change = setTimeout(() => {
        requestThemeChange(newTheme as any);
      }, 1500);
      // Some o gif após 2s
      timeouts.current.show = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setExpanding(false);
          setPendingTheme(null);
          setGifKey(prev => prev + 1); // Garante reset ao sumir
        }, 300); // espera o fade-out antes de encolher
      }, 2000);
    }, 50); // Pequeno delay para garantir reset visual
  };

  // Exponha uma função global para debug/manual
  (window as any).changeThemeWithGif = startThemeChangeWithGif;

  // ThemeToggle e outros devem chamar startThemeChangeWithGif

  // Detecta mudança de tema "externa" para mostrar o gif normalmente
  useEffect(() => {
    if (prevTheme.current !== theme && !pendingTheme) {
      // Limpa timeouts antigos
      if (timeouts.current.change) clearTimeout(timeouts.current.change);
      if (timeouts.current.show) clearTimeout(timeouts.current.show);
      setExpanding(false);
      setVisible(false);
      setGifKey(prev => prev + 1);
      setTimeout(() => {
        setVisible(true);
        setTimeout(() => setExpanding(true), 30);
        const t = setTimeout(() => {
          setVisible(false);
          setTimeout(() => {
            setExpanding(false);
            setGifKey(prev => prev + 1);
          }, 300); // espera o fade-out antes de encolher
        }, 2000);
        prevTheme.current = theme;
        return () => clearTimeout(t);
      }, 50);
    }
    prevTheme.current = theme;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 20, // menor que o navbar (z-30)
        pointerEvents: 'none',
        userSelect: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s',
      }}
    >
      <img
        key={gifKey}
        src={gifUrl}
        alt="Shigure UI Smol"
        style={{
          width: 120,
          height: 'auto',
          maxWidth: 'none',
          animation: 'spin 4s linear infinite',
          filter: theme === 'dark' ? 'invert(1) hue-rotate(180deg)' : 'none',
          display: 'block',
          transition: 'transform 3s cubic-bezier(0.4,0,0.2,1)',
          transform: expanding ? 'scale(20)' : 'scale(1)',
          imageRendering: 'auto',
        }}
        draggable={false}
      />
    </div>
  );
};

export default FloatingGif;
